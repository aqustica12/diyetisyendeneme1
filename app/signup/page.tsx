
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useClient } from "@/context/ClientContext";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const { login } = useAuth();
  const { addClient } = useClient();
  const router = useRouter();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
        toast({
            title: "Eksik Bilgi",
            description: "Lütfen tüm alanları doldurun.",
            variant: "destructive",
        });
        return;
    }

    addClient({
      name,
      email,
      phone,
      status: 'Aktif',
      joinDate: new Date().toLocaleDateString('tr-TR'),
      avatar: `https://placehold.co/100x100.png`,
    });
    
    login(email, phone);
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12 px-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSignup}>
          <CardHeader>
            <CardTitle className="text-2xl">Hesap Oluştur</CardTitle>
            <CardDescription>
              Başlamak için bilgilerinizi girin.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="full-name">Ad Soyad</Label>
              <Input id="full-name" placeholder="Adınız Soyadınız" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-posta</Label>
              <Input id="email" type="email" placeholder="ornek@eposta.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="phone">Telefon Numarası</Label>
              <Input id="phone" type="tel" placeholder="545 878 50 00" required value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Şifre</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full">Kayıt Ol</Button>
            <div className="mt-4 text-center text-sm">
              Zaten bir hesabınız var mı?{" "}
              <Link href="/login" className="underline">
                Giriş Yap
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
