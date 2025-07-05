"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen adınızı ve mesajınızı girin.",
        variant: "destructive",
      });
      return;
    }

    let messageBody = `Merhaba, ben ${name}.`;
    if (email) {
      messageBody += `\nE-posta: ${email}`;
    }
    if (subject) {
      messageBody += `\nKonu: ${subject}`;
    }
    messageBody += `\n\nMesajım: ${message}`;
    
    const whatsappUrl = `https://wa.me/905458785000?text=${encodeURIComponent(messageBody)}`;
    window.open(whatsappUrl, '_blank');

    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };


  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">İletişim</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Sorularınız, randevu talepleriniz veya işbirlikleri için bize ulaşın.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>İletişim Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <span>Tacettinveli Mah. Lalezade cad. No:28 Melikgazi/Kayseri</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                <a href="tel:+905458785000" className="hover:text-primary transition-colors">+90 545 878 50 00</a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                <a href="mailto:info@fitopya.com" className="hover:text-primary transition-colors">info@fitopya.com</a>
              </div>
              <div className="flex items-center gap-4">
                <MessageCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <a href="https://wa.me/905458785000" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp üzerinden ulaşın</a>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Harita</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video overflow-hidden rounded-lg">
                <iframe
                  src="https://maps.google.com/maps?q=Tacettinveli%20Mah.%20Lalezade%20cad.%20No:28%20Melikgazi%2FKayseri&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Konum Haritası"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Bize Mesaj Gönderin</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleWhatsAppSubmit}>
                <Input placeholder="Adınız Soyadınız" required value={name} onChange={(e) => setName(e.target.value)} />
                <Input type="email" placeholder="E-posta Adresiniz (İsteğe Bağlı)" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Konu (İsteğe Bağlı)" value={subject} onChange={(e) => setSubject(e.target.value)} />
                <Textarea placeholder="Mesajınız..." rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button type="submit" className="w-full">WhatsApp ile Gönder</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}