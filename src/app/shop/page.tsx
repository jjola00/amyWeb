import { InfiniteScroller } from '@/components/shop/infinite-scroller';
import { shopItems } from '@/lib/shop-items';
import { Button } from '@/components/ui/button';
import { EtsyIcon } from '@/components/icons';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function ShopPage() {
  // Filter only Etsy items
  const etsyItems = shopItems.filter(item => item.store === 'Etsy');
  const topRowItems = etsyItems.slice(0, Math.ceil(etsyItems.length / 2));
  const bottomRowItems = etsyItems.slice(Math.ceil(etsyItems.length / 2));

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
        <h1 className="text-4xl font-headline md:text-5xl text-primary">SHOP</h1>
        <p className="text-lg text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Find my work on Etsy.
        </p>
        <div className="flex justify-center">
          <Card className="hover:border-primary transition-colors duration-300 w-full max-w-md">
            <Link href="#" target="_blank" rel="noopener noreferrer" className="block p-6 h-full">
              <div className="w-full h-40 text-2xl font-headline flex flex-col items-center justify-center gap-4 transition-colors duration-300">
                <EtsyIcon className="w-40 h-40" />
              </div>
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