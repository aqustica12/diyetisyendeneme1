
'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import { services } from '@/lib/services-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-secondary/30">
        <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="grid lg:grid-cols-5 gap-12 items-start">
                {/* Left Column */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold font-headline">{service.title}</h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {service.fullDescription}
                        </p>
                    </div>
                    <Image
                        src={service.image}
                        alt={service.title}
                        width={800}
                        height={500}
                        className="w-full h-auto rounded-xl shadow-lg object-cover"
                        data-ai-hint={service.aiHint}
                    />
                     
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-8 lg:sticky lg:top-24">
                    {service.benefits && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Bu Programın Faydaları</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {service.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                            <span className="text-muted-foreground">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                     <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle>Sağlığınıza Yatırım Yapın</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="opacity-90 mb-4">
                                Profesyonel destekle hedeflerinize daha hızlı ve güvenli bir şekilde ulaşın. İlk adımı atmak için bizimle iletişime geçin.
                            </p>
                            <Link href="/contact">
                                <Button size="lg" variant="secondary" className="w-full">
                                    Hemen Bilgi Alın
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
             <div className="text-center mt-16">
                <Link href="/services" className="text-primary hover:underline">
                &larr; Tüm Hizmetlere Geri Dön
                </Link>
            </div>
        </div>
    </div>
  );
}
