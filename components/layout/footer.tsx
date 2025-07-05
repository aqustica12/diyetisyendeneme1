
"use client"

import Link from 'next/link';
import { Sprout, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  
  return (
    <footer className="border-t bg-secondary/50 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 justify-center md:justify-start">
              <Sprout className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Kayseri Diyetisyen</span>
            </Link>
            <p className="text-muted-foreground">
              Sağlıklı bir yaşama adım atmanız için size özel çözümler sunuyoruz. Bilimsel ve sürdürülebilir beslenme alışkanlıkları kazanın.
            </p>
          </div>
          
          {/* Hizmetlerimiz */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Hizmetlerimiz</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/services/kilo-verme-danismanligi" className="hover:text-primary transition-colors">Kilo Verme</Link></li>
              <li><Link href="/services/sporcu-beslenmesi" className="hover:text-primary transition-colors">Sporcu Beslenmesi</Link></li>
              <li><Link href="/services/online-diyet-programlari" className="hover:text-primary transition-colors">Online Diyet</Link></li>
              <li><Link href="/services/gebelik-ve-emzirme-donemi-beslenmesi" className="hover:text-primary transition-colors">Gebelik Beslenmesi</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors font-semibold">Tüm Hizmetler...</Link></li>
            </ul>
          </div>
          
          {/* Sayfalar */}
           <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Sayfalar</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Anasayfa</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Hizmetler</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">İletişim</Link></li>
            </ul>
          </div>

          {/* Social and Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Bizi Takip Edin</h3>
            <div className="flex items-center space-x-4 justify-center md:justify-start">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full bg-background/50 hover:bg-background">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full bg-background/50 hover:bg-background">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://wa.me/905458785000" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full bg-background/50 hover:bg-background">
                <MessageCircle className="h-6 w-6" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
             <div className="pt-2 text-muted-foreground text-sm space-y-1">
                <p><strong>E-posta:</strong> info@fitopya.com</p>
                <p><strong>Telefon:</strong> +90 545 878 50 00</p>
             </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {year} Kayseri Diyetisyen. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
