"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { EtsyIcon, RedbubbleIcon } from '@/components/icons';
import type { ShopItem } from '@/types';
import { cn } from '@/lib/utils';

interface InfiniteScrollerProps {
    items: ShopItem[];
    direction?: 'left' | 'right';
}

export function InfiniteScroller({ items, direction = 'left' }: InfiniteScrollerProps) {
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (scroller) {
            const scrollerContent = Array.from(scroller.children);
            scrollerContent.forEach(item => {
                const duplicatedItem = item.cloneNode(true);
                (duplicatedItem as HTMLElement).setAttribute("aria-hidden", "true");
                scroller.appendChild(duplicatedItem);
            });
        }
    }, [items]);

    const getStoreIcon = (store: 'Etsy' | 'Redbubble') => {
        if (store === 'Etsy') return <EtsyIcon className="w-4 h-4" />;
        if (store === 'Redbubble') return <RedbubbleIcon className="w-4 h-4" />;
        return null;
    };

    return (
        <div className="w-full overflow-hidden" ref={scrollerRef}>
            <div className={cn(
                "flex w-max hover:[animation-play-state:paused]",
                direction === 'left' ? 'animate-infinite-scroll' : 'animate-infinite-scroll-reverse'
            )}>
                {items.map((item) => (
                    <Link href="#" key={item.id} className="group w-64 mx-4" target="_blank" rel="noopener noreferrer">
                        <div className="relative overflow-hidden rounded-lg shadow-lg border border-border/40 transition-all duration-300 group-hover:shadow-primary/20 group-hover:border-primary group-hover:-translate-y-2">
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                width={300}
                                height={300}
                                className="w-full h-64 object-cover bg-muted"
                                data-ai-hint={item.imageHint}
                            />
                            <Badge 
                                className={cn(
                                    "absolute top-2 right-2 flex items-center gap-1.5",
                                    item.store === 'Etsy' ? 'bg-[#F1641E] hover:bg-[#F1641E]/90' : 'bg-[#E61B23] hover:bg-[#E61B23]/90',
                                    'text-white'
                                )}
                            >
                                {getStoreIcon(item.store)}
                                {item.store}
                            </Badge>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-4">
                                <h3 className="text-lg font-headline text-white">{item.name}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
