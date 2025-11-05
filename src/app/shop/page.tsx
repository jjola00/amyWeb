import { InfiniteScroller } from '@/components/shop/infinite-scroller';
import { shopItems } from '@/lib/shop-items';
import { Button } from '@/components/ui/button';
import { EtsyIcon, RedbubbleIcon } from '@/components/icons';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function ShopPage() {
  // Split items for two carousels
  const topRowItems = shopItems.slice(0, shopItems.length / 2);
  const bottomRowItems = shopItems.slice(shopItems.length / 2);

  return (
    <div className="w-full animate-fade-in space-y-12">
      <div className="relative">
        <div 
          className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" 
          aria-hidden="true" 
        />
        <InfiniteScroller items={topRowItems} direction="left" />
        <div 
          className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" 
          aria-hidden="true" 
        />
      </div>

      <div className="text-center max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-headline md:text-5xl text-primary">Shop</h1>
        <p className="text-lg text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Find my work on Etsy and Redbubble.
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

      <div className="relative">
        <div 
          className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" 
          aria-hidden="true" 
        />
        <InfiniteScroller items={bottomRowItems} direction="right" />
        <div 
          className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" 
          aria-hidden="true" 
        />
      </div>
    </div>
  );
}