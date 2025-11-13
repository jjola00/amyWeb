"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { urlFor } from '@/lib/sanityImageUrl';
import { getComicBySlug } from '@/lib/sanity-queries';
import type { Comic } from '@/types';

interface ComicReaderProps {
  comicSlug: string | null;
  onOpenChange: (isOpen: boolean) => void;
}

export function ComicReader({ comicSlug, onOpenChange }: ComicReaderProps) {
  const [comic, setComic] = useState<Comic | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (comicSlug) {
      setLoading(true);
      getComicBySlug(comicSlug)
        .then((data) => {
          setComic(data);
          setCurrentPage(0); // Start from first page
        })
        .catch((error) => {
          console.error('Error loading comic:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setComic(null);
      setCurrentPage(0);
    }
  }, [comicSlug]);

  const nextPage = () => {
    if (comic && currentPage < comic.pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!comic) return;
      
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      } else if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (comicSlug) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [comic, currentPage, comicSlug, onOpenChange]);

  if (!comicSlug) return null;

  return (
    <Dialog open={!!comicSlug} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-full h-[85vh] p-0 bg-black border-0 overflow-hidden">
        <div className="relative w-full h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-black/90 text-white">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5" />
              <h2 className="font-headline text-xl">
                {loading ? 'Loading...' : comic?.title || 'Comic'}
              </h2>
            </div>
            
            {comic && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/80">
                  Page {currentPage + 1} of {comic.pages.length}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Comic Page Display */}
          <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
            {loading ? (
              <div className="text-white text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>Loading comic...</p>
              </div>
            ) : comic && comic.pages.length > 0 ? (
              <>
                {/* Two-Page Spread */}
                <div className="flex items-center justify-center gap-4 w-full h-full p-2">
                  {/* Left Page */}
                  {currentPage > 0 && (
                    <div className="relative w-[48%] h-full flex items-center justify-center">
                      <Image
                        src={urlFor(comic.pages[currentPage - 1].image.asset).width(800).url()}
                        alt={comic.pages[currentPage - 1].image.alt}
                        width={800}
                        height={1000}
                        className="max-w-full max-h-full object-contain"
                        priority
                      />
                    </div>
                  )}
                  
                  {/* Right Page (Current) */}
                  <div className="relative w-[48%] h-full flex items-center justify-center">
                    <Image
                      src={urlFor(comic.pages[currentPage].image.asset).width(800).url()}
                      alt={comic.pages[currentPage].image.alt}
                      width={800}
                      height={1000}
                      className="max-w-full max-h-full object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Navigation Arrows */}
                {comic.pages.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full w-12 h-12 z-10"
                      onClick={prevPage}
                      disabled={currentPage === 0}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full w-12 h-12 z-10"
                      onClick={nextPage}
                      disabled={currentPage === comic.pages.length - 1}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </>
                )}
              </>
            ) : (
              <div className="text-white text-center">
                <p>No pages found for this comic.</p>
              </div>
            )}
          </div>

          {/* Page Navigation Strip */}
          {comic && comic.pages.length > 1 && (
            <div className="p-3 bg-black/90 border-t border-white/10 max-h-24 overflow-hidden">
              <div className="flex gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
                {comic.pages.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`relative flex-shrink-0 w-12 h-16 rounded border transition-all overflow-hidden ${
                      index === currentPage 
                        ? 'border-primary ring-1 ring-primary/20' 
                        : 'border-white/20 hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={urlFor(page.image.asset).width(48).height(64).url()}
                      alt={`Page ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-0.5">
                      {index + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}