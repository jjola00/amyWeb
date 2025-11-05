import { InfiniteScroller } from '@/components/shop/infinite-scroller';
import { shopItems } from '@/lib/shop-items';

export default function ShopPage() {
  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline md:text-5xl text-primary mb-4">Shop</h1>
        <p className="text-lg text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="relative">
        <div 
          className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" 
          aria-hidden="true" 
        />
        <InfiniteScroller items={shopItems} />
        <div 
          className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" 
          aria-hidden="true" 
        />
      </div>
    </div>
  );
}
