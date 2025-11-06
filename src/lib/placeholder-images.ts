import { loadGalleryContent } from './content';
import type { Artwork } from '@/types';

// For backward compatibility, provide a function to get artworks
export async function getArtworks(): Promise<Artwork[]> {
  const content = await loadGalleryContent();
  return content.artworks;
}

// DEPRECATED: This export is always an empty array and will be removed soon.
// Any component importing `artworks` directly will receive no data.
// Please migrate to using the async `getArtworks()` function instead.
export const artworks: Artwork[] = [];
