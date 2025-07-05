
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Leaf, Heart, Brain, Zap, CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useBlog } from "@/context/BlogContext";
import { services } from "@/lib/services-data";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const { posts } = useBlog();
  const latestPosts = posts.slice(0, 3);
  const exampleServices = services.slice(0, 3);

  const [waName, setWaName] = useState('');
  const [waDate, setWaDate] = useState<Date | undefined>(new Date());
  const [waTime, setWaTime] = useState('');
  const [waNote, setWaNote] = useState('');

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waName || !waDate || !waTime) {
      alert("Lütfen randevu talebi için tüm alanları doldurun.");
      return;
    }

    const formattedDate = format(waDate, "PPP", { locale: tr });
    
    let messageBody = `Merhaba, ben ${waName}. ${formattedDate} tarihi, saat ${waTime} için randevu talep etmek istiyorum.`;

    if (waNote) {
      messageBody += `\n\nNotum: ${waNote}`;
    }

    const message = encodeURIComponent(messageBody);
    const whatsappUrl = `https://wa.me/905458785000?text=${message}`;
    window.open(whatsappUrl, '_blank');

    setWaName('');
    setWaDate(new Date());
    setWaTime('');
    setWaNote('');
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-accent/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Kayseri Diyetisyen ile Sağlıklı Yaşama Adım Atın
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Kişiye özel beslenme programları ve profesyonel danışmanlık ile
                  ideal kilonuza ve sağlıklı bir yaşama kavuşun.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/services">
                  <Button size="lg">Hizmetlerimizi Keşfedin</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    İletişime Geçin
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              data-ai-hint="healthy food smiling woman"
              width="600"
              height="400"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                Felsefemiz
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Sadece Diyet Değil, Yaşam Tarzı
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Kayseri Diyetisyen olarak, sürdürülebilir ve keyifli bir beslenme alışkanlığı kazandırmayı hedefliyoruz. Yasaklarla dolu listeler yerine, vücudunuzu dinleyerek ve doğru besinleri seçerek sağlıklı bir yaşam sürmenize rehberlik ediyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-12 md:py-24 bg-accent/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-2 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Sağlıklı Yaşamın Faydaları</h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">Dengeli beslenme ve aktif bir yaşamın size katacakları saymakla bitmez.</p>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
            <div className="grid gap-1 text-center">
              <Leaf className="h-10 w-10 mx-auto text-primary" />
              <h3 className="text-lg font-bold">Enerji Artışı</h3>
              <p className="text-sm text-muted-foreground">
                Doğru besinlerle gün boyu daha enerjik ve zinde hissedin.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <Heart className="h-10 w-10 mx-auto text-primary" />
              <h3 className="text-lg font-bold">İdeal Kilo</h3>
              <p className="text-sm text-muted-foreground">
                Vücudunuza uygun programlarla sağlıklı bir şekilde kilo verin veya alın.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <Brain className="h-10 w-10 mx-auto text-primary" />
              <h3 className="text-lg font-bold">Zihinsel Netlik</h3>
              <p className="text-sm text-muted-foreground">
                Beslenmenin beyin fonksiyonları üzerindeki olumlu etkilerini yaşayın.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <Zap className="h-10 w-10 mx-auto text-primary" />
              <h3 className="text-lg font-bold">Hastalıklardan Korunma</h3>
              <p className="text-sm text-muted-foreground">
                Güçlü bir bağışıklık sistemi ile hastalıklara karşı direncinizi artırın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Examples Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-3 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Popüler Hizmetlerimiz</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Her bireyin ihtiyacı farklıdır. Size en uygun programı birlikte belirleyelim.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                {exampleServices.map(service => (
                     <Card key={service.slug} className="flex flex-col text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <CardHeader className="items-center">
                          {service.icon}
                          <CardTitle className="mt-4">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-muted-foreground">{service.description}</p>
                        </CardContent>
                        <CardFooter className="justify-center">
                            <Link href={`/services/${service.slug}`}>
                               <Button variant="outline">Daha Fazla Bilgi</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="mt-8 text-center">
                <Link href="/services">
                <Button>Tüm Hizmetleri Gör</Button>
                </Link>
            </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="w-full py-12 md:py-24 bg-accent/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-3 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Güncel Blog Yazıları</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sağlıklı yaşam ve beslenme üzerine en son yazılarımıza göz atın.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map(post => (
              <Card key={post.slug} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <Link href={`/blog/${post.slug}`} className="block">
                  <Image
                    src={post.image}
                    data-ai-hint="healthy food blog"
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-48 object-cover "
                  />
                </Link>
                <CardHeader>
                  <CardTitle>
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto bg-secondary/30 py-3 px-6">
                  <p className="text-xs text-muted-foreground">{post.date}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button>Tüm Blog Yazılarına Göz At</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Appointment Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Hızlı Randevu Alın</h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
              Aşağıdaki formu doldurarak WhatsApp üzerinden kolayca randevu talebi oluşturun.
            </p>
          </div>
          <Card className="mt-8 max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="wa-name">Adınız Soyadınız</Label>
                  <Input id="wa-name" placeholder="Adınız Soyadınız" required value={waName} onChange={(e) => setWaName(e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label>Tarih Seçin</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !waDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {waDate ? format(waDate, "PPP", { locale: tr }) : <span>Bir tarih seçin</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={waDate}
                                onSelect={setWaDate}
                                initialFocus
                                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wa-time">Saat Seçin</Label>
                  <Input
                      id="wa-time"
                      type="time"
                      value={waTime}
                      onChange={(e) => setWaTime(e.target.value)}
                      required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wa-note">Notunuz (İsteğe Bağlı)</Label>
                  <Textarea
                    id="wa-note"
                    placeholder="Örn: Online danışmanlık hakkında bilgi almak istiyorum."
                    value={waNote}
                    onChange={(e) => setWaNote(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">WhatsApp ile Randevu İste</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
