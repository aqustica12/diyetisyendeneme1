
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { services } from "@/lib/services-data";

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Hizmetlerimiz</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Sağlıklı bir geleceğe adım atmanız için sunduğumuz profesyonel hizmetleri keşfedin.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.slug} className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <CardHeader className="items-center text-center">
              {service.icon}
              <CardTitle className="mt-4">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
            <CardFooter className="justify-center pt-4">
              <Link href={`/services/${service.slug}`}>
                <Button>Detayları Gör</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
