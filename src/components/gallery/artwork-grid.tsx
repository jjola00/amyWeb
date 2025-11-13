"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import type { Artwork, Category } from '@/types';
import { FilterControls } from './filter-controls';
import { ImageLightbox } from './image-lightbox';
import { ComicReader } from './comic-reader';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { imagePresets, getBlurDataURL } from '@/lib/sanityImageUrl';

export function ArtworkGrid({ artworks }: { artworks: Artwork[] }) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<Artwork | null>(null);
  const [selectedComicSlug, setSelectedComicSlug] = useState<string | null>(null);

  // Memoize categories to prevent recalculation
  const categories = useMemo(() => 
    ['All', ...Array.from(new Set(artworks.map(art => art.category?.name).filter((name): name is string => Boolean(name))))],
    [artworks]
  );

  // Memoize filtered artworks for better performance
  const filteredArtworks = useMemo(() => 
    activeFilter === 'All'
      ? artworks
      : artworks.filter(art => art.category?.name === activeFilter),
    [artworks, activeFilter]
  );

  return (
    <>
      <FilterControls categories={categories} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3 xl:columns-4">
        <AnimatePresence mode="popLayout">
          {filteredArtworks.map((art, index) => {
            // Preload images for better performance
            const imageUrl = imagePresets.card(art.image).url();
            const isVisible = index < 12; // Prioritize first 12 images
            
            return (
              <motion.div
                key={art._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.2, 
                  delay: Math.min(index * 0.02, 0.3) // Cap delay for better UX
                }}
                className="mb-4 break-inside-avoid"
              >
                <Card 
                  className={`overflow-hidden group cursor-pointer ${art.category?.name === 'Comics' ? 'comic-stack' : ''}`}
                  onClick={() => {
                    if (art.category?.name === 'Comics' && art.comic?.slug?.current) {
                      setSelectedComicSlug(art.comic.slug.current);
                    } else {
                      setSelectedImage(art);
                    }
                  }}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={imageUrl}
                        alt={art.image.alt}
                        width={art.image.asset.metadata?.dimensions?.width || 600}
                        height={art.image.asset.metadata?.dimensions?.height || 800}
                        className="w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
                        priority={isVisible} // Prioritize visible images
                        loading={isVisible ? "eager" : "lazy"}
                        placeholder={getBlurDataURL(art.image) ? "blur" : "empty"}
                        blurDataURL={getBlurDataURL(art.image)}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        quality={85} // Slightly lower quality for faster loading
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <p className="text-white text-lg font-headline p-4 text-center">{art.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Preload images for other categories for instant switching */}
      <div className="hidden">
        {artworks
          .filter(art => art.category?.name !== activeFilter)
          .slice(0, 20) // Preload first 20 from other categories
          .map(art => (
            <Image
              key={`preload-${art._id}`}
              src={imagePresets.card(art.image).url()}
              alt=""
              width={1}
              height={1}
              priority={false}
              loading="lazy"
              quality={50} // Lower quality for preloading
            />
          ))
        }
      </div>

      <ImageLightbox
        artwork={selectedImage}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedImage(null);
          }
        }}
      />

      <ComicReader
        comicSlug={selectedComicSlug}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedComicSlug(null);
          }
        }}
      />
    </>
  );
}
