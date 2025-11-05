import { InfiniteScroller } from '@/components/shop/infinite-scroller';
import { shopItems } from '@/lib/shop-items';
import { Button } from '@/components/ui/button';
import { EtsyIcon, RedbubbleIcon } from '@/components/icons';
import Link from 'next/link';

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

      <div className="text-center max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-headline md:text-5xl text-primary">Shop</h1>
        <p className="text-lg text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Find my work on Etsy and Redbubble.
        </p>
        <div className="flex justify-center gap-4">
            <Link href="#" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-14 text-lg bg-[#F1641E] hover:bg-[#F1641E]/90 text-white">
                    <EtsyIcon className="mr-3 h-6 w-6" />
                    Visit Etsy Shop
                </Button>
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-14 text-lg bg-[#E61B23] hover:bg-[#E61B23]/90 text-white">
                    <RedbubbleIcon className="mr-3 h-6 w-6" />
                    Visit Redbubble
                </Button>
            </Link>
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
