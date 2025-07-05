
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';
import { useAppointment } from '@/context/AppointmentContext';

export default function AppointmentPage() {
    const { isAuthenticated, userRole, userEmail } = useAuth();
    const { addClientAppointment } = useAppointment();
    const router = useRouter();
    const { toast } = useToast();
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState("");

    useEffect(() => {
        if (isAuthenticated === false) {
            router.push('/login');
        } else if (isAuthenticated === true && userRole !== 'client') {
            router.push('/');
        }
    }, [isAuthenticated, userRole, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !time) {
            toast({
                title: "Eksik Bilgi",
                description: "Lütfen bir tarih ve saat seçin.",
                variant: "destructive",
            });
            return;
        }

        if (!userEmail) {
            toast({
                title: "Hata",
                description: "Kullanıcı bilgisi alınamadı. Lütfen tekrar giriş yapın.",
                variant: "destructive",
            });
            return;
        }
        
        const newAppointment = await addClientAppointment({
            clientName: userEmail,
            date: format(date, "yyyy-MM-dd"),
            time: time,
        });

        toast({
            title: "Randevu Talebi Alındı",
            description: `Randevu talebiniz ${format(newAppointment.date, "PPP", { locale: tr })} tarihi için saat ${newAppointment.time} olarak alınmıştır. Onay için sizinle iletişime geçilecektir.`,
        });

        setDate(new Date());
        setTime("");
    };
    
    if (!isAuthenticated || userRole !== 'client') {
        return (
            <div className="container mx-auto px-4 py-12 md:py-24 max-w-2xl">
                 <div className="text-center mb-12">
                    <Skeleton className="h-12 w-1/2 mx-auto" />
                    <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
                </div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/3" />
                         <Skeleton className="h-5 w-2/3" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }


    return (
        <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">Randevu Al</h1>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                    Size uygun bir zaman dilimi seçerek online randevu talebinizi oluşturabilirsiniz.
                </p>
            </div>
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Randevu Formu</CardTitle>
                    <CardDescription>Lütfen randevu almak istediğiniz tarih ve saati seçin.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label>Tarih Seçin</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP", { locale: tr }) : <span>Bir tarih seçin</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time">Saat Seçin</Label>
                            <Input
                                id="time"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">Randevu Talebi Gönder</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
