"use client";

import React, { useEffect, useRef } from 'react';
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
            // Clear previous content before adding new items
            const scrollerInner = scroller.querySelector('.scroller-inner');
            if (scrollerInner) {
                scrollerInner.innerHTML = ''; // Clear existing items to prevent duplication on HMR
                
                const allItems = [...items, ...items, ...items]; // Make the list long enough for smooth scrolling
                
                allItems.forEach((item, index) => {
                    const link = document.createElement('a');
                    link.href = item.etsyUrl || "#";
                    link.className = "group w-64 mx-4";
                    if (item.etsyUrl) {
                        link.target = "_blank";
                        link.rel = "noopener noreferrer";
                    }

                    const divOuter = document.createElement('div');
                    divOuter.className = "relative overflow-hidden rounded-lg shadow-lg border border-border/40 transition-all duration-300 group-hover:shadow-primary/20 group-hover:border-primary group-hover:-translate-y-2";

                    const image = document.createElement('img');
                    image.src = item.imageUrl;
                    image.alt = item.name;
                    image.width = 300;
                    image.height = 300;
                    image.className = "w-full h-64 object-cover bg-muted";
                    image.setAttribute('data-ai-hint', item.imageHint);

                    const gradientDiv = document.createElement('div');
                    gradientDiv.className = "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent";

                    const textDiv = document.createElement('div');
                    textDiv.className = "absolute bottom-0 left-0 p-4";

                    const h3 = document.createElement('h3');
                    h3.className = "text-lg font-headline text-white";
                    h3.textContent = item.name;

                    textDiv.appendChild(h3);
                    divOuter.appendChild(image);
                    divOuter.appendChild(gradientDiv);
                    divOuter.appendChild(textDiv);
                    link.appendChild(divOuter);
                    
                    scrollerInner.appendChild(link);
                });
            }
        }
    }, [items]);

    return (
        <div className="w-full overflow-hidden" ref={scrollerRef}>
            <div className={cn(
                "scroller-inner flex w-max hover:[animation-play-state:paused]",
                direction === 'left' ? 'animate-infinite-scroll' : 'animate-infinite-scroll-reverse'
            )}>
              {/* Content is generated dynamically in useEffect */}
            </div>
        </div>
    );
}
