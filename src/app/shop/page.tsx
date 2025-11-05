import { Button } from "@/components/ui/button";
import { EtsyIcon, RedbubbleIcon } from "@/components/icons";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function ShopPage() {
  return (
    <div className="max-w-3xl mx-auto text-center animate-fade-in">
      <h1 className="text-4xl font-headline md:text-5xl text-primary mb-8">Shop</h1>
      <p className="text-lg text-muted-foreground mb-12">
        You can find my merchandise, prints, and stickers on my external shop pages. Thanks for your support!
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="hover:border-primary transition-colors duration-300">
          <Link href="#" target="_blank" rel="noopener noreferrer" className="block p-4 h-full">
            <Button variant="ghost" className="w-full h-40 text-2xl font-headline flex-col gap-4">
              <EtsyIcon className="w-12 h-12 text-primary" />
              <span>Etsy Store</span>
            </Button>
          </Link>
        </Card>
        <Card className="hover:border-primary transition-colors duration-300">
          <Link href="#" target="_blank" rel="noopener noreferrer" className="block p-4 h-full">
            <Button variant="ghost" className="w-full h-40 text-2xl font-headline flex-col gap-4">
              <RedbubbleIcon className="w-12 h-12 text-primary" />
              <span>Redbubble</span>
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
