
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { login, isAuthenticated, userRole } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [isAuthenticated, userRole, router]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    
    const isAdmin = email.toLowerCase() === 'admin@fitopya.com';

    if (isAdmin && password === 'admin123') {
        login(email, null);
    } else if (!isAdmin && email && password) { // Mock login for any client
        login(email, null);
    } else if (isAdmin && password !== 'admin123') {
        toast({
            title: "Hatalı Şifre",
            description: "Admin için girdiğiniz şifre yanlış.",
            variant: "destructive",
        })
    }
    else {
        toast({
            title: "Hata",
            description: "Lütfen tüm alanları doldurun.",
            variant: "destructive",
        })
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12 px-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle className="text-2xl">Giriş Yap</CardTitle>
            <CardDescription>
              Devam etmek için e-posta adresinizi ve şifrenizi girin.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-posta</Label>
              <Input id="email" type="email" placeholder="ornek@eposta.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Şifre</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full">Giriş Yap</Button>
            <div className="mt-4 text-center text-sm">
              Henüz bir hesabınız yok mu?{" "}
              <Link href="/signup" className="underline">
                Kayıt Ol
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
