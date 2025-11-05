import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Beetlehead Designs Portfolio',
  description: 'Portfolio for a digital character artist and mascot designer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased min-h-screen flex flex-col bg-background")}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
            {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
