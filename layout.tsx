
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { BlogProvider } from '@/context/BlogContext';
import { AuthProvider } from '@/context/AuthContext';
import { AppointmentProvider } from '@/context/AppointmentContext';
import { ClientProvider } from '@/context/ClientContext';

export const metadata: Metadata = {
  title: 'Kayseri Diyetisyen - Sağlıklı Yaşam ve Beslenme Danışmanlığı',
  description: 'Diyetisyen Kübra Akın ile kişiselleştirilmiş beslenme programları, sağlıklı yaşam tüyoları ve daha fazlası. Kayseri Diyetisyen ile sağlığınıza yatırım yapın.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <AuthProvider>
          <BlogProvider>
            <ClientProvider>
              <AppointmentProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </AppointmentProvider>
            </ClientProvider>
          </BlogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
