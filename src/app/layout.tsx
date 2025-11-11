import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-headline",
});

export const metadata: Metadata = {
  title: "Beetlehead Designs",
  description: "Digital and traditional art portfolio featuring original artwork, fanart, commissions, and more.",
  keywords: ["art", "digital art", "traditional art", "portfolio", "commissions"],
  authors: [{ name: "Beetlehead" }],
  creator: "Beetlehead",
  openGraph: {
    title: "Beetlehead Portfolio",
    description: "Digital and traditional art portfolio featuring original artwork, fanart, commissions, and more.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beetlehead Portfolio",
    description: "Digital and traditional art portfolio featuring original artwork, fanart, commissions, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} antialiased min-h-screen bg-background font-sans flex flex-col`}
      >
        <Header />
        <main className="container mx-auto px-4 py-8 flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}