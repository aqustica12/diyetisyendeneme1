
"use client";

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, CalendarDays, FileText, UtensilsCrossed, Phone } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { useClient } from '@/context/ClientContext';


const chartData = [
  { month: "Ocak", kg: 80 },
  { month: "Şubat", kg: 78 },
  { month: "Mart", kg: 77 },
  { month: "Nisan", kg: 76 },
  { month: "Mayıs", kg: 74 },
  { month: "Haziran", kg: 72 },
]

const chartConfig = {
  kg: {
    label: "Kilo (kg)",
    color: "hsl(var(--chart-1))",
  },
}

export default function ClientProfilePage() {
  const params = useParams();
  const { clients } = useClient();
  const client = clients.find(c => c.id === params.id);

  const [meals, setMeals] = useState([
    { id: 1, date: '2024-07-22', type: 'Kahvaltı', details: 'Yulaf ezmesi, meyveler.' },
    { id: 2, date: '2024-07-21', type: 'Akşam Yemeği', details: 'Izgara somon, salata.' },
    { id: 3, date: '2024-07-21', type: 'Öğle Yemeği', details: 'Tavuklu sandviç.' },
  ]);

  const [newMealDate, setNewMealDate] = useState(new Date().toISOString().split('T')[0]);
  const [newMealType, setNewMealType] = useState('Kahvaltı');
  const [newMealDetails, setNewMealDetails] = useState('');

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMealDate && newMealDetails) {
      const newMealEntry = {
        id: meals.length + 1,
        date: newMealDate,
        type: newMealType,
        details: newMealDetails,
      };
      setMeals([newMealEntry, ...meals]);
      setNewMealDetails(''); // Reset only details for quick entry
    }
  };


  if (!client) {
    notFound();
  }
  
  const whatsappLink = client.phone ? `https://wa.me/${client.phone.replace(/\D/g, '')}` : '#';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/clients">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Geri</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold md:text-2xl">Danışan Profili</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 flex flex-col gap-6">
            <Card>
                <CardHeader className="flex-row items-center gap-4 pb-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={client.avatar} data-ai-hint="person portrait" alt={client.name} />
                        <AvatarFallback>{client.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                         <CardTitle>{client.name}</CardTitle>
                         <CardDescription>
                            <Badge variant={client.status === 'Aktif' ? 'default' : client.status === 'Beklemede' ? 'secondary' : 'outline'}>
                                {client.status}
                            </Badge>
                         </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{client.email}</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">{client.phone}</a>
                    </div>
                     <div className="flex items-center gap-3">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Kayıt Tarihi: {client.joinDate}</span>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Aktif Yemek Planı</CardTitle>
                    <CardDescription>Danışanın güncel beslenme programı.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <FileText className="h-6 w-6 text-primary"/>
                            <div>
                                <p className="font-semibold">Dengeli Kilo Verme Planı</p>
                                <p className="text-xs text-muted-foreground">1800 kcal / gün</p>
                            </div>
                        </div>
                         <Button variant="outline" size="sm">Görüntüle</Button>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Gelişim Grafiği</CardTitle>
                    <CardDescription>Danışanın son 6 aydaki kilo değişimi.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <Tooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Bar dataKey="kg" fill="hsl(var(--primary))" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <UtensilsCrossed className="h-6 w-6 text-primary" />
                        <CardTitle>Öğün Kayıtları</CardTitle>
                    </div>
                    <CardDescription>Danışanın tükettiği öğünleri kaydedin ve görüntüleyin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={handleAddMeal} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="meal-date">Tarih</Label>
                                <Input id="meal-date" type="date" value={newMealDate} onChange={(e) => setNewMealDate(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="meal-type">Öğün</Label>
                                <Select value={newMealType} onValueChange={setNewMealType}>
                                    <SelectTrigger id="meal-type">
                                        <SelectValue placeholder="Öğün seçin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Kahvaltı">Kahvaltı</SelectItem>
                                        <SelectItem value="Öğle Yemeği">Öğle Yemeği</SelectItem>
                                        <SelectItem value="Akşam Yemeği">Akşam Yemeği</SelectItem>
                                        <SelectItem value="Ara Öğün 1">Ara Öğün 1</SelectItem>
                                        <SelectItem value="Ara Öğün 2">Ara Öğün 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="meal-details">Detaylar</Label>
                            <Textarea id="meal-details" placeholder="Tüketilen yiyecekleri girin..." value={newMealDetails} onChange={(e) => setNewMealDetails(e.target.value)} required />
                        </div>
                        <Button type="submit" className="w-full sm:w-auto">Öğün Ekle</Button>
                    </form>
                    <Separator />
                    <div className="space-y-2">
                         <h4 className="font-medium text-sm">Son Kayıtlar</h4>
                         <div className="border rounded-lg max-h-60 overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[120px]">Tarih</TableHead>
                                        <TableHead className="w-[120px]">Öğün</TableHead>
                                        <TableHead>Detay</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {meals.map((meal) => (
                                    <TableRow key={meal.id}>
                                        <TableCell>{meal.date}</TableCell>
                                        <TableCell>{meal.type}</TableCell>
                                        <TableCell>{meal.details}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Danışan Notları</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <p>Danışan, glutensiz beslenmeyi tercih ediyor ve laktoz intoleransı var. Motivasyonu yüksek ancak akşam saatlerinde tatlı krizleri yaşıyor. Son görüşmede, bu krizlerle başa çıkmak için sağlıklı atıştırmalık alternatifleri üzerine konuşuldu.</p>
                        <p className="text-xs pt-2 border-t mt-4">Son Güncelleme: 2 gün önce</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
