import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Instagram } from "lucide-react";
import Link from "next/link";
import { TikTokIcon, TumblrIcon } from "@/components/icons";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      <h1 className="text-4xl font-headline md:text-5xl text-primary mb-8">Get In Touch</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Card>
        <CardContent className="p-8 flex flex-col items-center gap-8">
            <Link href="mailto:contact@example.com" className="w-full max-w-sm">
                <Button size="lg" className="w-full text-lg h-14">
                    <Mail className="mr-3 h-6 w-6" />
                    contact@example.com
                </Button>
            </Link>

            <div className="text-center">
                <p className="text-muted-foreground mb-4">... or find me on social media:</p>
                <div className="flex justify-center gap-4">
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="w-16 h-16 rounded-full border-2 hover:border-primary hover:text-primary transition-colors duration-300">
                            <Instagram className="h-8 w-8" />
                            <span className="sr-only">Instagram</span>
                        </Button>
                    </Link>
                     <Link href="#" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="w-16 h-16 rounded-full border-2 hover:border-primary hover:text-primary transition-colors duration-300">
                            <TikTokIcon className="h-8 w-8" />
                            <span className="sr-only">TikTok</span>
                        </Button>
                    </Link>
                     <Link href="#" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="w-16 h-16 rounded-full border-2 hover:border-primary hover:text-primary transition-colors duration-300">
                            <TumblrIcon className="h-8 w-8" />
                            <span className="sr-only">Tumblr</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
