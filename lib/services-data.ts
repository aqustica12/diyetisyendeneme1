
import React, { type ReactElement } from "react";
import { 
    MinusCircle, PlusCircle, BookOpen, Baby, Dumbbell, Building, HeartPulse, Laptop, Sprout, Vegan, ClipboardList 
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: ReactElement;
  image: string;
  aiHint: string;
  benefits: string[];
}

export const services: Service[] = [
  {
    slug: "kilo-verme-danismanligi",
    title: "Kilo Verme Danışmanlığı",
    description: "Kalıcı ve sağlıklı kilo kaybı için size özel hazırlanan, bilimsel temelli beslenme programları.",
    fullDescription: "Fazla kilolarınızdan sürdürülebilir ve sağlıklı yöntemlerle kurtulmanız için yanınızdayız. Yaşam tarzınıza, tercihlerinize ve metabolizmanıza uygun kişiselleştirilmiş diyet listeleri ile aç kalmadan, enerjiniz düşmeden ideal kilonuza ulaşmanızı hedefliyoruz.",
    icon: React.createElement(MinusCircle, { className: "h-10 w-10 text-primary" }),
    image: "https://placehold.co/800x600.png",
    aiHint: "healthy salad measuring tape",
    benefits: [
      "Kişiye özel beslenme planları",
      "Metabolizma hızlandırma teknikleri",
      "Porsiyon kontrolü ve yeme farkındalığı eğitimi",
      "Kalıcı sonuçlar için davranış değişikliği desteği"
    ]
  },
  {
    slug: "kilo-alma-programlari",
    title: "Kilo Alma Programları",
    description: "Sağlıklı bir şekilde kilo almak ve kas kütlenizi artırmak için tasarlanmış beslenme planları.",
    fullDescription: "Sağlıklı bir şekilde kilo almak, en az kilo vermek kadar özen gerektiren bir süreçtir. Doğru besinleri, doğru zamanda ve doğru miktarda tüketerek kas kütlenizi artırmayı ve sağlıklı bir vücut yapısına kavuşmanızı sağlıyoruz.",
    icon: React.createElement(PlusCircle, { className: "h-10 w-10 text-primary" }),
    image: "https://placehold.co/800x600.png",
    aiHint: "protein shake healthy food",
    benefits: [
      "Kalorisi yoğun, besleyici değeri yüksek öğünler",
      "Kas gelişimini destekleyen makro ve mikro besin dengesi",
      "İştah artırmaya yönelik doğal yöntemler",
      "Enerji seviyelerinde belirgin artış"
    ]
  },
   {
    slug: "saglikli-beslenme-egitimi",
    title: "Sağlıklı Beslenme Eğitimi",
    description: "Besinleri tanıyın, etiket okumayı öğrenin ve kendi sağlıklı menülerinizi oluşturun.",
    fullDescription: "Diyet listelerine bağlı kalmak yerine, sağlıklı beslenmenin mantığını kavramak ve bunu bir yaşam biçimi haline getirmek isteyenler için tasarlanmıştır. Bu programla yiyeceklerin efendisi siz olursunuz.",
    icon: React.createElement(BookOpen, { className: "h-10 w-10 text-primary" }),
    image: "https://placehold.co/800x600.png",
    aiHint: "nutrition class open book",
    benefits: [
      "Besin grupları ve fonksiyonları hakkında derinlemesine bilgi",
      "Market alışverişi ve etiket okuma becerileri",
      "Sağlıklı pişirme teknikleri",
      "Ömür boyu sürdürülebilir beslenme alışkanlıkları"
    ]
  },
  {
    slug: "gebelik-ve-emzirme-donemi-beslenmesi",
    title: "Gebelik ve Emzirme Dönemi Beslenmesi",
    description: "Hem sizin hem de bebeğinizin sağlığı için bu özel dönemde ihtiyacınız olan tüm besinleri alın.",
    fullDescription: "Gebelik ve emzirme, annenin ve bebeğin sağlığı için kritik dönemlerdir. Bu süreçte hem sizin ihtiyaçlarınızı karşılayacak hem de bebeğinizin optimal gelişimini destekleyecek güvenli ve dengeli beslenme programları hazırlıyoruz.",
    icon: React.createElement(Baby, { className: "h-10 w-10 text-primary" }),
    image: "https://placehold.co/800x600.png",
    aiHint: "pregnant woman healthy food",
    benefits: [
      "Bebeğin sağlıklı gelişimi için gerekli tüm besin ögelerinin alımı",
      "Annenin enerji seviyesini yüksek tutma ve gebelik şikayetlerini azaltma",
      "Doğum sonrası sağlıklı kilo verme desteği",
      "Süt kalitesini ve miktarını artıran beslenme tüyoları"
    ]
  },
  {
    slug: "cocuk-ve-ergen-beslenmesi",
    title: "Çocuk ve Ergen Beslenmesi",
    description: "Büyüme ve gelişme çağındaki çocuklarınız için doğru ve dengeli beslenme alışkanlıkları kazandırın.",
    fullDescription: "Çocukluk ve ergenlik dönemi, sağlıklı bir yetişkinliğin temelinin atıldığı en önemli zamanlardır. Bu dönemde doğru beslenme alışkanlıkları kazandırmak, hem fiziksel hem de zihinsel gelişim için hayati önem taşır.",
    icon: React.createElement(Laptop, { className: "h-10 w-10 text-primary" }),
    image: "https://placehold.co/800x600.png",
    aiHint: "happy child eating vegetables",
    benefits: [
      "Sağlıklı büyüme ve gelişimi destekleme",
      "Odaklanma ve okul başarısını artırma",
      "Yeme bozuklukları ve obezite riskini azaltma",
      "Güçlü bir bağışıklık sistemi oluşturma"
    ]
  },
  {
    slug: "sporcu-beslenmesi",
    title: "Sporcu Beslenmesi",
    description: "Performansınızı en üst seviyeye çıkarmak, kas gelişiminizi desteklemek ve toparlanmayı hızlandırmak için.",
    fullDescription: "Yaptığınız spora, antrenman yoğunluğunuza ve hedeflerinize özel olarak hazırlanan beslenme programları ile performansınızı maksimize edin, sakatlanma riskinizi azaltın ve hedeflerinize daha hızlı ulaşın.",
    icon: React.createElement(Dumbbell, { className: "h-10 w-10 text-primary" }),
    image: "https://placehold.co/800x600.png",
    aiHint: "athlete healthy meal",
    benefits: [
      "Antrenman öncesi ve sonrası optimal beslenme",
      "Performans ve dayanıklılık artışı",
      "Kas kütlesi kazanımı ve yağ yakımının desteklenmesi",
      "Daha hızlı toparlanma ve yenilenme"
    ]
  },
  {
    slug: "kurumsal-beslenme-danismanligi",
    title: "Kurumsal Beslenme Danışmanlığı",
    description: "Çalışanlarınızın sağlığını ve motivasyonunu artırarak iş verimliliğini yükseltin.",
    fullDescription: "Sağlıklı beslenen çalışanlar daha enerjik, motive ve verimli olur. Şirketlere özel hazırladığımız seminerler, atölye çalışmaları ve bireysel danışmanlıklarla çalışma ortamınıza sağlık ve zindelik katıyoruz.",
    icon: React.createElement(Building, { className: "h-10 w-10 text-primary" }),
    image: "https://placehold.co/800x600.png",
    aiHint: "office presentation wellness",
    benefits: [
      "Çalışan memnuniyeti ve motivasyonunda artış",
      "Hastalığa bağlı iş günü kayıplarında azalma",
      "Stres yönetimi ve konsantrasyonun iyileştirilmesi",
      "Daha pozitif ve sağlıklı bir çalışma ortamı"
    ]
  },
  {
    slug: "kronik-hastaliklarda-beslenme",
    title: "Kronik Hastalıklarda Beslenme",
    description: "Diyabet, tansiyon, kalp hastalıkları gibi durumlarda tıbbi beslenme tedavisi ile yaşam kalitenizi artırın.",
    fullDescription: "Kronik hastalıkların yönetiminde doğru beslenme, tedavinin en önemli parçalarından biridir. Hastalığınıza özel tıbbi beslenme tedavisi ile semptomlarınızı hafifletmeyi, hastalığın seyrini yavaşlatmayı ve genel yaşam kalitenizi yükseltmeyi hedefliyoruz.",
    icon: React.createElement(HeartPulse, { className: "h-10 w-10 text-primary" }),
    image: "https://placehold.co/800x600.png",
    aiHint: "doctor patient nutrition",
    benefits: [
      "Hastalık semptomlarının kontrol altına alınması",
      "İlaç ihtiyacının azaltılmasına yardımcı olma",
      "Komplikasyon riskini düşürme",
      "Daha enerjik ve sağlıklı bir yaşam"
    ]
  },
  {
    slug: "online-diyet-programlari",
    title: "Online Diyet Programları",
    description: "Konumdan bağımsız, online görüşmelerle hedeflerinize ulaşın. Dünyanın her yerinden destek alın.",
    fullDescription: "Yoğun bir temponuz varsa veya farklı bir şehirde yaşıyorsanız, online diyet programlarımız tam size göre. Video görüşmeler ve dijital takip araçları ile nerede olursanız olun, profesyonel diyetisyen desteği alın.",
    icon: React.createElement(Laptop, { className: "h-10 w-10 text-primary" }),
    image: "https://placehold.co/800x600.png",
    aiHint: "woman video call laptop",
    benefits: [
      "Zaman ve mekandan bağımsızlık",
      "Yoğun yaşam temposuna tam uyum",
      "Sürekli motivasyon için dijital iletişim kanalları",
      "Yüz yüze danışmanlık ile aynı kalitede hizmet"
    ]
  },
  {
    slug: "detoks-ve-arinma-programlari",
    title: "Detoks ve Arınma Programları",
    description: "Vücudunuzu toksinlerden arındırın, enerjinizi yenileyin ve daha hafif hissedin.",
    fullDescription: "Vücudunuza bir mola vermek ve onu zararlı toksinlerden arındırmak için tasarlanmış kısa süreli, besleyici ve güvenli detoks programları. Kendinizi daha hafif, enerjik ve yenilenmiş hissedeceksiniz.",
    icon: React.createElement(Sprout, { className: "h-10 w-10 text-primary" }),
    image: "https://placehold.co/800x600.png",
    aiHint: "green smoothie fruit",
    benefits: [
      "Şişkinlik ve ödemin azalması",
      "Sindirim sisteminin rahatlaması",
      "Cilt sağlığında iyileşme",
      "Enerji seviyelerinde artış"
    ]
  },
  {
    slug: "vejetaryen-vegan-beslenme",
    title: "Vejetaryen / Vegan Beslenme",
    description: "Bitki bazlı beslenirken tüm besin ihtiyaçlarınızı karşıladığınızdan emin olun.",
    fullDescription: "Vejetaryen veya vegan beslenme tarzını benimseyenler için, hiçbir besin ögesinden eksik kalmadan, dengeli ve sağlıklı bir diyet planı oluşturuyoruz. Bitkisel kaynaklardan maksimum faydayı sağlamanız için size rehberlik ediyoruz.",
    icon: React.createElement(Vegan, { className: "h-10 w-10 text-primary" }),
    image: "https://placehold.co/800x600.png",
    aiHint: "colorful vegan bowl",
    benefits: [
      "Dengeli protein, demir ve B12 alımı",
      "Bitki bazlı beslenmenin tüm sağlık faydalarından yararlanma",
      "Lezzetli ve çeşitli vegan/vejetaryen tarifler",
      "Enerji ve zindelik seviyesinin korunması"
    ]
  },
  {
    slug: "menu-planlama-hizmetleri",
    title: "Menü Planlama ve Takip",
    description: "Size veya ailenize özel haftalık/aylık menülerle 'bugün ne pişirsem' derdine son verin.",
    fullDescription: "Sağlıklı beslenmek istiyor ama her gün ne pişireceğinizi düşünmekten yorulduysanız bu hizmet tam size göre. Tercihlerinize ve hedeflerinize uygun, lezzetli ve pratik haftalık menüler planlıyor, alışveriş listeleri ile hayatınızı kolaylaştırıyoruz.",
    icon: React.createElement(ClipboardList, { className: "h-10 w-10 text-primary" }),
    image: "https://placehold.co/800x600.png",
    aiHint: "meal prep containers kitchen",
    benefits: [
      "Zaman ve para tasarrufu",
      "Besin çeşitliliğinin sağlanması",
      "Sağlıklı beslenmenin sürdürülebilir hale gelmesi",
      "'Ne pişirsem?' stresinin ortadan kalkması"
    ]
  },
];
