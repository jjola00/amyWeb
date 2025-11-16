"use client";

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Artwork } from '@/types';
import { Badge } from '../ui/badge';
import { imagePresets, getBlurDataURL } from '@/lib/sanityImageUrl';

interface ImageLightboxProps {
  artwork: Artwork | null;
  onOpenChange: (isOpen: boolean) => void;
}

export function ImageLightbox({ artwork, onOpenChange }: ImageLightboxProps) {
  return (
    <Dialog open={!!artwork} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0">
        {artwork && (
          <div className="relative w-full h-full flex flex-col md:flex-row">
            {/* Image container - takes most of the space */}
            <div className="relative flex-1 min-h-[60vh] md:min-h-full">
              <Image
                src={imagePresets.fullsize(artwork.image).url()}
                alt={artwork.image.alt}
                fill
                className="object-contain p-4"
                placeholder={getBlurDataURL(artwork.image) ? "blur" : "empty"}
                blurDataURL={getBlurDataURL(artwork.image)}
                sizes="(max-width: 768px) 95vw, 1200px"
                priority
              />
            </div>
            
            {/* Info panel - overlay on mobile, sidebar on desktop */}
            <div className="absolute bottom-0 left-0 right-0 md:relative md:max-w-sm bg-background/95 backdrop-blur-sm p-6 flex flex-col border-t md:border-t-0 md:border-l">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl md:text-3xl mb-2 text-primary">{artwork.title}</DialogTitle>
                {artwork.description && (
                  <DialogDescription className="text-sm md:text-base text-muted-foreground">
                    {artwork.description}
                  </DialogDescription>
                )}
              </DialogHeader>
              <div className="mt-4 space-y-2">
                {artwork.category && (
                  <Badge variant="secondary">{artwork.category.name}</Badge>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
