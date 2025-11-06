import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Instagram } from "lucide-react";
import Link from "next/link";
import { TikTokIcon, TumblrIcon } from "@/components/icons";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      <h1 className="text-4xl font-headline md:text-5xl text-primary mb-8">CONTACT</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Card>
        <CardContent className="p-8 flex flex-col items-center gap-8">
          <Link href="mailto:beetleheaddesigns@gmail.com" className="w-full max-w-sm">
            <Button size="lg" className="w-full text-lg h-14">
              <Mail className="mr-3 h-6 w-6" />
              beetleheaddesigns@gmail.com
            </Button>
          </Link>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">... or find me on social media:</p>
            <div className="flex justify-center gap-4">
              <Link href="https://www.instagram.com/beetleheaddesigns" target="_blank" rel="noopener noreferrer">
                <div className="w-16 h-16 rounded-full border-2 border-border hover:border-primary transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </div>
              </Link>
              <Link href="https://www.tiktok.com/@beetleheaddesigns" target="_blank" rel="noopener noreferrer">
                <div className="w-16 h-16 rounded-full border-2 border-border hover:border-primary transition-colors duration-300 flex items-center justify-center">
                  <TikTokIcon className="h-4 w-4" />
                  <span className="sr-only">TikTok</span>
                </div>
              </Link>
              <Link href="https://www.tumblr.com/beetleheaddesigns" target="_blank" rel="noopener noreferrer">
                <div className="w-16 h-16 rounded-full border-2 border-border hover:border-primary transition-colors duration-300 flex items-center justify-center">
                  <TumblrIcon className="h-4 w-4" />
                  <span className="sr-only">Tumblr</span>
                </div>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
