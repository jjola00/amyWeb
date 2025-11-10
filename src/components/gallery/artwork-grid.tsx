"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { Artwork, Category } from '@/types';
import { FilterControls } from './filter-controls';
import { ImageLightbox } from './image-lightbox';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';

export function ArtworkGrid({ artworks }: { artworks: Artwork[] }) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<Artwork | null>(null);

  // Extract unique categories from artworks
  const categories = ['All', ...Array.from(new Set(artworks.map(art => art.category?.name).filter(Boolean)))];

  const filteredArtworks = activeFilter === 'All'
    ? artworks
    : artworks.filter(art => art.category?.name === activeFilter);

  return (
    <>
      <FilterControls categories={categories} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3 xl:columns-4">
        <AnimatePresence>
          {filteredArtworks.map((art, index) => (
            <motion.div
              key={art._id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="mb-4 break-inside-avoid"
            >
              <Card 
                className="overflow-hidden group cursor-pointer"
                onClick={() => setSelectedImage(art)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={art.image.asset.url}
                      alt={art.image.alt}
                      width={art.image.asset.metadata?.dimensions?.width || 400}
                      height={art.image.asset.metadata?.dimensions?.height || 400}
                      className="w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
                      priority={index < 8}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white text-lg font-headline p-4 text-center">{art.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ImageLightbox
        artwork={selectedImage}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedImage(null);
          }
        }}
      />
    </>
  );
}
