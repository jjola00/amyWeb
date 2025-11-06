export type ArtworkCategory = 'Digital Fanart' | 'Digital Original Art' | 'Traditional Original Art' | 'Mascot' | 'Commissions' | 'Sketches' | 'Comics';

export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  category: ArtworkCategory;
  description: string;
  imageHint: string;
  width: number;
  height: number;
}

export interface ShopItem {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string;
  store: 'Etsy';
}
