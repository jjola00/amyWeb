import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Instagram } from "lucide-react";
import Link from "next/link";
import { TikTokIcon, TumblrIcon } from "@/components/icons";
import { loadSiteSettings } from "@/lib/content";
import { ContactForm } from "@/components/contact-form";

export default async function ContactPage() {
  const settings = await loadSiteSettings();
  const { instagram, tiktok, tumblr } = settings.socialLinks || {};

  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      <h1 className="text-4xl font-headline md:text-5xl text-primary mb-8">CONTACT</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Feel free to send me an email about commissions, collaborations, events, or just to say hi!
      </p>
      <Card>
        <CardContent className="p-8 flex flex-col items-center gap-8">
          <ContactForm />

          <div className="text-center">
            <p className="text-muted-foreground mb-4">... or find me on social media:</p>
            <div className="flex justify-center gap-4">
              {instagram && (
                <Link href={instagram} target="_blank" rel="noopener noreferrer">
                  <div className="w-16 h-16 rounded-full border-2 border-border hover:border-primary transition-colors duration-300 flex items-center justify-center">
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                  </div>
                </Link>
              )}
              {tiktok && (
                <Link href={tiktok} target="_blank" rel="noopener noreferrer">
                  <div className="w-16 h-16 rounded-full border-2 border-border hover:border-primary transition-colors duration-300 flex items-center justify-center">
                    <TikTokIcon className="h-4 w-4" />
                    <span className="sr-only">TikTok</span>
                  </div>
                </Link>
              )}
              {tumblr && (
                <Link href={tumblr} target="_blank" rel="noopener noreferrer">
                  <div className="w-16 h-16 rounded-full border-2 border-border hover:border-primary transition-colors duration-300 flex items-center justify-center">
                    <TumblrIcon className="h-4 w-4" />
                    <span className="sr-only">Tumblr</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}