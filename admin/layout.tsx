
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminNav } from "@/components/admin/admin-nav";
import { Home } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";


function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { logout } = useAuth();
    const router = useRouter();

    return (
        <>
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary tracking-tight">Admin Paneli</h1>
                <div className="flex items-center gap-2">
                     <Button variant="outline" size="sm" asChild>
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4"/>
                            Siteye Dön
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => { logout(); router.push('/login'); }}>Çıkış Yap</Button>
                </div>
            </header>
            
            <AdminNav />

            <main>
                {children}
            </main>
        </>
    );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { isAuthenticated, userRole } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated === undefined) {
            return; 
        }

        if (!isAuthenticated) {
            router.push('/login');
        } 
        else if (userRole !== 'admin') {
            router.push('/');
        }
    }, [isAuthenticated, userRole, router]);

    if (isAuthenticated !== true || userRole !== 'admin') {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                     <div className="space-y-8">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-10 w-48" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-9 w-28" />
                                <Skeleton className="h-9 w-24" />
                            </div>
                        </div>
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-96 w-full" />
                    </div>
                </div>
            </div>
        );
    }
    
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminLayoutContent>
            {children}
        </AdminLayoutContent>
      </div>
    </div>
  );
}
