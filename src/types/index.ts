export type ArtworkCategory = 'Mascots' | 'Character Design' | 'Convention Work' | 'Customer Photos';

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
  store: 'Etsy' | 'Redbubble';
}
