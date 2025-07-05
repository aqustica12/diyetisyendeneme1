
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Users, CalendarClock, Newspaper, CheckCircle2, Loader2 } from "lucide-react";
import { useClient } from "@/context/ClientContext";
import { useAppointment } from "@/context/AppointmentContext";
import { useBlog } from "@/context/BlogContext";
import type { Client } from "@/context/ClientContext";
import type { Appointment } from "@/context/AppointmentContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { sendWhatsAppReminders } from "@/ai/flows/whatsapp-reminder-flow";


const Lira = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground">
        <path d="M6 18V4H10C11.1046 4 12 4.89543 12 6V9C12 10.1046 11.1046 11 10 11H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 11H12C13.1046 11 14 11.8954 14 13V15C14 16.1046 13.1046 17 12 17H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 4V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 17V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

interface DashboardData {
  totalClients: number;
  pendingAppointments: number;
  totalPosts: number;
  monthlyEarnings: number;
  latestClient: Client | null;
  latestAppointment: Appointment | null;
}

export default function AdminDashboardPage() {
  const { clients } = useClient();
  const { appointments } = useAppointment();
  const { posts } = useBlog();
  const { toast } = useToast();
  const [isTesting, setIsTesting] = useState(false);
  const [tomorrowsAppointments, setTomorrowsAppointments] = useState<Appointment[]>([]);

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalClients: 0,
    pendingAppointments: 0,
    totalPosts: 0,
    monthlyEarnings: 0,
    latestClient: null,
    latestAppointment: null,
  });

  useEffect(() => {
    const totalClients = clients.length;
    const pendingAppointments = appointments.filter(a => a.status === 'Beklemede').length;
    const totalPosts = posts.length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyEarnings = appointments
      .filter(a => 
        a.status === 'Onaylandı' &&
        a.price &&
        new Date(a.date).getMonth() === currentMonth &&
        new Date(a.date).getFullYear() === currentYear
      )
      .reduce((sum, a) => sum + (a.price || 0), 0);
    
    const latestClient = clients.length > 0 ? clients[0] : null;
    const latestAppointment = appointments.length > 0 ? appointments[0] : null;

    // Use Turkey's timezone to determine "tomorrow"
    const nowInTurkey = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    const tomorrowInTurkey = new Date(nowInTurkey);
    tomorrowInTurkey.setDate(nowInTurkey.getDate() + 1);
    
    const year = tomorrowInTurkey.getFullYear();
    const month = (tomorrowInTurkey.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrowInTurkey.getDate().toString().padStart(2, '0');
    const tomorrowString = `${year}-${month}-${day}`;
    
    const remindersForTomorrow = appointments.filter(a => 
        a.date === tomorrowString &&
        a.status === 'Onaylandı'
    );
    setTomorrowsAppointments(remindersForTomorrow);

    setDashboardData({
      totalClients,
      pendingAppointments,
      totalPosts,
      monthlyEarnings,
      latestClient,
      latestAppointment
    });

  }, [clients, appointments, posts]);

  const handleTestReminders = async () => {
    setIsTesting(true);
    toast({
        title: "Test Başlatıldı",
        description: "Yarınki randevular için hatırlatmalar kontrol ediliyor...",
    });
    try {
        const result = await sendWhatsAppReminders();
        if (result.errors && result.errors.length > 0) {
             toast({
                title: "Test Sırasında Hata",
                description: `Hata: ${result.errors.join(', ')}`,
                variant: "destructive",
            });
        } else if (result.remindersSent > 0) {
            toast({
                title: "Test Başarılı",
                description: `${result.remindersSent} test hatırlatması başarıyla gönderildi.`,
            });
        } else {
             toast({
                title: "Test Tamamlandı",
                description: "Gönderilecek uygun test randevusu bulunamadı. Lütfen yarın için 'Onaylandı' durumunda bir randevu olduğundan emin olun.",
                variant: "default",
            });
        }
    } catch (error: any) {
        toast({
            title: "Test Sırasında Kritik Hata",
            description: `Bir hata oluştu: ${error.message}`,
            variant: "destructive",
        });
    }
    setIsTesting(false);
  };


  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Toplam Danışan
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              Tüm zamanlar
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Randevular</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.pendingAppointments}</div>
             <p className="text-xs text-muted-foreground">
              Onayınızı bekliyor
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Yazıları</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalPosts}</div>
             <p className="text-xs text-muted-foreground">
              Toplam
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Aylık Kazanç
            </CardTitle>
            <Lira />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.monthlyEarnings} TL</div>
             <p className="text-xs text-muted-foreground">
              Bu ay onaylanan randevulardan
            </p>
          </CardContent>
        </Card>
      </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
              <CardHeader>
                <CardTitle>Otomatik Hatırlatmalar</CardTitle>
                <CardDescription>Randevu hatırlatmaları her 15 dakikada bir kontrol edilir ve randevudan 24 saat önce gönderilir.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                         <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                         <div>
                            <p className="font-semibold text-foreground">Sistem Aktif</p>
                            <p className="text-sm text-muted-foreground">Hatırlatmalarınız sizin yerinize gönderiliyor.</p>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-sm font-medium">Yarın Gönderilecekler ({tomorrowsAppointments.length})</h4>
                         {tomorrowsAppointments.length > 0 ? (
                            <div className="border rounded-lg p-3 max-h-32 overflow-y-auto">
                                <ul className="space-y-2">
                                    {tomorrowsAppointments.map(app => {
                                        const client = clients.find(c => c.email === app.clientName || c.name === app.clientName);
                                        const displayName = client ? client.name : app.clientName;
                                        return (
                                            <li key={app.id} className="flex justify-between items-center text-sm">
                                                <p className="font-medium">{displayName}</p>
                                                <p className="text-muted-foreground">{app.time}</p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                         ) : (
                            <div className="text-sm text-muted-foreground text-center py-4 border rounded-lg">Yarın için gönderilecek hatırlatma bulunmuyor.</div>
                         )}
                      </div>
                  </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex-col items-start gap-2">
                <p className="text-sm text-muted-foreground">Sistemin doğru çalıştığını manuel olarak tetiklemek için bir test gönderebilirsiniz. Mesaj, yarın için randevusu olan herkese gönderilecektir.</p>
                <Button onClick={handleTestReminders} disabled={isTesting} size="sm">
                    {isTesting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Kontrol Ediliyor...
                        </>
                    ) : (
                        "Hatırlatmaları Şimdi Kontrol Et"
                    )}
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Son Aktiviteler</CardTitle>
                <CardDescription>Paneldeki son hareketler.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    {dashboardData.latestClient ? (
                        <li><span className="font-semibold text-foreground">{dashboardData.latestClient.name}</span> yeni danışan olarak eklendi.</li>
                    ) : (
                        <li>Henüz danışan eklenmedi.</li>
                    )}
                    {dashboardData.latestAppointment ? (
                        <li><span className="font-semibold text-foreground">{dashboardData.latestAppointment.clientName}</span> için randevu durumu <span className="text-foreground">{dashboardData.latestAppointment.status}</span> olarak güncellendi.</li>
                    ) : (
                        <li>Henüz randevu bilgisi yok.</li>
                    )}
                    {posts.length > 0 ? (
                        <li>Son blog yazısı yayınlandı: <span className="text-foreground">"{posts[0].title}"</span></li>
                    ) : (
                         <li>Henüz blog yazısı yok.</li>
                    )}
                </ul>
              </CardContent>
            </Card>
       </div>
    </div>
  );
}
