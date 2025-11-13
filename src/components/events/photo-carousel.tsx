"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { urlFor } from '@/lib/sanityImageUrl';
import type { Event } from '@/types';

interface PhotoCarouselProps {
  media: Event['media'];
  eventName: string;
}

export function PhotoCarousel({ media, eventName }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!media || media.length === 0) {
    return null;
  }

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const goToMedia = (index: number) => {
    setCurrentIndex(index);
  };

  const currentItem = media[currentIndex];
  const isVideo = currentItem._type === 'file';

  return (
    <>
      <div className="relative">
        {/* Main media display */}
        <Card className="overflow-hidden group cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
          <div className="relative aspect-video bg-muted">
            {isVideo ? (
              // Video display - autoplay and loop
              <video
                src={currentItem.asset.url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              // Image display
              <Image
                src={urlFor(currentItem.asset).width(600).height(400).url()}
                alt={currentItem.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            )}
            
            {/* Navigation arrows */}
            {media.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 text-white border-0 rounded-full w-10 h-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevMedia();
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 text-white border-0 rounded-full w-10 h-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextMedia();
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </>
            )}

            {/* Media counter */}
            {media.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {currentIndex + 1} / {media.length}
              </div>
            )}
          </div>

          {/* Caption */}
          {currentItem.caption && (
            <div className="p-3 bg-card">
              <p className="text-sm text-muted-foreground">{currentItem.caption}</p>
            </div>
          )}
        </Card>

        {/* Thumbnail navigation */}
        {media.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {media.map((item, index) => {
              const isVideoThumb = item._type === 'file';
              const thumbSrc = isVideoThumb && item.thumbnail 
                ? urlFor(item.thumbnail.asset).width(64).height(64).url()
                : isVideoThumb 
                  ? null
                  : urlFor(item.asset).width(64).height(64).url();

              return (
                <button
                  key={item._key || index}
                  onClick={() => goToMedia(index)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {thumbSrc ? (
                    <Image
                      src={thumbSrc}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <svg className="w-6 h-6 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  )}
                  {isVideoThumb && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-black/50 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>

            <div className="relative aspect-video">
              {isVideo ? (
                <video
                  src={currentItem.asset.url}
                  controls
                  className="w-full h-full object-contain"
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={urlFor(currentItem.asset).width(1200).height(800).url()}
                  alt={currentItem.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              )}

              {/* Lightbox navigation */}
              {media.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full w-12 h-12"
                    onClick={prevMedia}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full w-12 h-12"
                    onClick={nextMedia}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>

            {/* Lightbox info */}
            <div className="p-4 text-white">
              <h3 className="font-headline text-lg">{eventName}</h3>
              {currentItem.caption && (
                <p className="text-sm text-white/80 mt-1">{currentItem.caption}</p>
              )}
              {media.length > 1 && (
                <p className="text-xs text-white/60 mt-2">
                  {isVideo ? 'Video' : 'Photo'} {currentIndex + 1} of {media.length}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}