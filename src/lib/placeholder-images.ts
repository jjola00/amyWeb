import { loadGalleryContent } from './content';
import type { Artwork } from '@/types';

// For backward compatibility, provide a function to get artworks
export async function getArtworks(): Promise<Artwork[]> {
  const content = await loadGalleryContent();
  return content.artworks;
}

// Legacy export for components that expect synchronous access
// This will be replaced when components are updated to use async loading
export const artworks: Artwork[] = [];
