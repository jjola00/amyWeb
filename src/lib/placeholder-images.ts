// This file is deprecated - all artwork data now comes from Sanity CMS
// Use getArtworks() from sanity-queries.ts instead

import type { Artwork } from '@/types';

// Legacy exports for backward compatibility - will be empty since we use Sanity now
export const artworks: Artwork[] = [];

export async function getArtworks(): Promise<Artwork[]> {
  // This function is deprecated
  // Use getArtworks() from ./sanity-queries.ts instead
  return [];
}
