
'use client';

import Link from 'next/link';
import { Menu, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Anasayfa' },
  { href: '/about', label: 'Hakkımızda' },
  { href: '/services', label: 'Hizmetler' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'İletişim' },
];

const clientNavLinks = [
    { href: '/meal-plans', label: 'Yemek Planım' },
    { href: '/progress', label: 'Gelişimim' },
    { href: '/appointment', label: 'Randevu Al' },
];

export function Header() {
  const { isAuthenticated, userRole, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="font-bold">Kayseri Diyetisyen</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && userRole === 'client' && clientNavLinks.map((link) => (
               <Link
                key={link.href}
                href={link.href}
                className="font-semibold transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
                {isAuthenticated ? (
                    <>
                     {userRole === 'admin' && (
                         <Link href="/admin">
                             <Button variant="outline">Admin Paneli</Button>
                         </Link>
                     )}
                     <Button onClick={handleLogout}>Çıkış Yap</Button>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <Button variant="outline">Giriş Yap</Button>
                        </Link>
                        <Link href="/signup">
                            <Button>Kayıt Ol</Button>
                        </Link>
                    </>
                )}
            </div>
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle navigation menu"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <SheetClose asChild>
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Sprout className="h-6 w-6 text-primary" />
                                <span className="font-bold">Kayseri Diyetisyen</span>
                            </Link>
                        </SheetClose>
                        {navLinks.map((link) => (
                            <SheetClose asChild key={link.href}>
                                <Link href={link.href} className="hover:text-primary">{link.label}</Link>
                            </SheetClose>
                        ))}
                        {isAuthenticated && userRole === 'client' && clientNavLinks.map((link) => (
                            <SheetClose asChild key={link.href}>
                                <Link href={link.href} className="font-semibold hover:text-primary">{link.label}</Link>
                            </SheetClose>
                        ))}
                        <div className="flex flex-col space-y-2 pt-4 border-t">
                             {isAuthenticated ? (
                                <>
                                 {userRole === 'admin' && (
                                     <SheetClose asChild>
                                        <Link href="/admin">
                                            <Button variant="outline" className="w-full">Admin Paneli</Button>
                                        </Link>
                                    </SheetClose>
                                 )}
                                <SheetClose asChild>
                                    <Button onClick={handleLogout} className="w-full">Çıkış Yap</Button>
                                </SheetClose>
                                </>
                            ) : (
                                <>
                                    <SheetClose asChild>
                                        <Link href="/login">
                                            <Button variant="outline" className="w-full">Giriş Yap</Button>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link href="/signup">
                                            <Button className="w-full">Kayıt Ol</Button>
                                        </Link>
                                    </SheetClose>
                                </>
                            )}
                        </div>
                    </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
