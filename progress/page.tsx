
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart as BarChartIcon, LineChart as LineChartIcon, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, Bar, CartesianGrid, Legend } from "recharts";
import Image from "next/image";
import { Weight, Droplets, HeartPulse, Ruler } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const weightData = [
  { date: "Hafta 1", Kilo: 80 },
  { date: "Hafta 2", Kilo: 79.5 },
  { date: "Hafta 3", Kilo: 79 },
  { date: "Hafta 4", Kilo: 78 },
  { date: "Hafta 5", Kilo: 77.5 },
  { date: "Hafta 6", Kilo: 76 },
];

const bodyFatData = [
  { date: "Hafta 1", "Yağ Oranı": 25 },
  { date: "Hafta 2", "Yağ Oranı": 24.5 },
  { date: "Hafta 3", "Yağ Oranı": 24 },
  { date: "Hafta 4", "Yağ Oranı": 23.5 },
  { date: "Hafta 5", "Yağ Oranı": 23 },
  { date: "Hafta 6", "Yağ Oranı": 22 },
];

export default function ProgressPage() {
  const { isAuthenticated, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
      if (isAuthenticated === false) {
          router.push('/login');
      } else if (isAuthenticated === true && userRole !== 'client') {
          router.push('/');
      }
  }, [isAuthenticated, userRole, router]);

  if (!isAuthenticated || userRole !== 'client') {
      return (
          <div className="container mx-auto px-4 py-12 md:py-24">
              <div className="text-center mb-12">
                  <Skeleton className="h-12 w-1/2 mx-auto" />
                  <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
              </div>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  <Skeleton className="h-80 w-full" />
                  <Skeleton className="h-80 w-full" />
               </div>
          </div>
      );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Gelişimim</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Başarınızı görselleştirin. İlerlemenizi takip ederek motivasyonunuzu yüksek tutun.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mevcut Kilo</CardTitle>
            <Weight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76 kg</div>
            <p className="text-xs text-muted-foreground">-4 kg başlangıçtan itibaren</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vücut Kitle Endeksi</CardTitle>
            <Ruler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.5</div>
            <p className="text-xs text-muted-foreground">Normal aralıkta</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vücut Yağ Oranı</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%22</div>
            <p className="text-xs text-muted-foreground">-%3 başlangıçtan itibaren</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sıradaki Kontrol</CardTitle>
            <HeartPulse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 gün sonra</div>
            <p className="text-xs text-muted-foreground">15 Temmuz 2024</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Kilo Değişim Grafiği</CardTitle>
            <CardDescription>Haftalık kilo değişiminizi takip edin.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChartIcon data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="Kilo" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChartIcon>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Vücut Yağ Oranı Değişimi</CardTitle>
            <CardDescription>Yağ oranındaki düşüşü görselleştirin.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChartIcon data={bodyFatData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Legend />
                <Bar dataKey="Yağ Oranı" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChartIcon>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline mb-4">Vücut Şeması</h2>
        <p className="text-muted-foreground mb-8">Ölçümlerinizdeki değişimi görsel olarak görün.</p>
        <div className="flex justify-center">
          <Image src="https://placehold.co/600x600.png" data-ai-hint="body measurement chart" alt="Vücut Şeması" width={600} height={600} className="rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
}
