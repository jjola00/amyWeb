import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { loadSiteSettings } from "@/lib/content";

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await loadSiteSettings();
  
  return {
    title: settings.siteTitle,
    description: settings.siteDescription,
    keywords: ["art", "digital art", "traditional art", "portfolio", "commissions"],
    authors: [{ name: settings.artistName }],
    creator: settings.artistName,
    openGraph: {
      title: settings.siteTitle,
      description: settings.siteDescription,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.siteTitle,
      description: settings.siteDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Netlify Identity Widget for CMS Authentication */}
        <script 
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          async
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} antialiased min-h-screen bg-background font-sans flex flex-col`}
      >
        <Header />
        <main className="container mx-auto px-4 py-8 flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
        
        {/* Netlify Identity Authentication Handler */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on("init", user => {
                  if (!user) {
                    window.netlifyIdentity.on("login", () => {
                      document.location.href = "/admin/";
                    });
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}