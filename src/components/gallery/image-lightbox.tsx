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
      <DialogContent className="max-w-4xl p-0">
        {artwork && (
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[50vh] md:min-h-0">
              <Image
                src={imagePresets.fullsize(artwork.image).url()}
                alt={artwork.image.alt}
                fill
                className="object-contain rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                placeholder={getBlurDataURL(artwork.image) ? "blur" : "empty"}
                blurDataURL={getBlurDataURL(artwork.image)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6 flex flex-col">
              <DialogHeader>
                <DialogTitle className="font-headline text-3xl mb-2 text-primary">{artwork.title}</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">{artwork.description}</DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-2">
                {artwork.category && (
                  <Badge variant="secondary">{artwork.category.name}</Badge>
                )}
                {artwork.description && (
                  <div className="text-sm text-muted-foreground">
                    <p>{artwork.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
