import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Award, GraduationCap, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-1 flex flex-col items-center text-center">
          <div className="relative w-full max-w-xs">
            <Image
              src="https://placehold.co/400x500.png"
              data-ai-hint="professional dietitian portrait"
              alt="Diyetisyen Kübra Akın"
              width={400}
              height={500}
              className="rounded-xl object-cover shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold mt-6 font-headline">Kübra Akın</h1>
          <p className="text-muted-foreground mt-1">Kurucu Diyetisyen</p>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 font-headline text-center md:text-left">Hakkımda</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Merhaba, ben Kübra Akın. Sağlıklı beslenmenin bir yaşam biçimi olduğuna inanıyorum ve bu yolculukta sizlere rehberlik etmek için buradayım. Üniversite eğitimimi beslenme ve diyetetik üzerine tamamladıktan sonra, çeşitli kliniklerde ve danışmanlık merkezlerinde deneyim kazandım. Amacım, her bireyin kendi vücudunu tanımasını sağlayarak, sürdürülebilir ve kişiye özel beslenme alışkanlıkları kazandırmaktır.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Fitopya'yı, bilimin ışığında, modern ve etkili yöntemlerle danışanlarıma en iyi hizmeti sunma hayaliyle kurdum. Gelin, sağlığınıza yapacağınız bu en değerli yatırımda birlikte yol alalım.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="text-center bg-secondary/50">
              <CardHeader>
                <GraduationCap className="h-10 w-10 mx-auto text-primary mb-2" />
                <CardTitle>Eğitim</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Beslenme ve Diyetetik Lisans Derecesi</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-secondary/50">
              <CardHeader>
                <Award className="h-10 w-10 mx-auto text-primary mb-2" />
                <CardTitle>Deneyim</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">10+ Yıl Klinik Deneyim</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-secondary/50">
              <CardHeader>
                <HeartHandshake className="h-10 w-10 mx-auto text-primary mb-2" />
                <CardTitle>Yaklaşım</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Bütüncül ve Kişiye Özel Yaklaşım</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
