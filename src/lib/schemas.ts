import { z } from 'zod';

// Artwork schema
export const ArtworkSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  imageHint: z.string().min(1, 'Image hint is required for accessibility'),
  width: z.number().positive('Width must be positive'),
  height: z.number().positive('Height must be positive'),
  category: z.enum([
    'Digital Fanart',
    'Digital Original Art', 
    'Traditional Original Art',
    'Mascot',
    'Commissions',
    'Sketches',
    'Comics'
  ])
});

// Shop item schema
export const ShopItemSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  imageHint: z.string().min(1, 'Image hint is required for accessibility'),
  store: z.literal('Etsy')
});

// Event schema
export const EventSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().datetime('Must be a valid datetime'),
  location: z.string().optional(),
  link: z.string().url('Must be a valid URL').optional(),
  imageUrl: z.string().url('Must be a valid URL').optional()
});

// Page content schema
export const PageContentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required')
});

// Site settings schema
export const SiteSettingsSchema = z.object({
  siteTitle: z.string().min(1, 'Site title is required'),
  siteDescription: z.string().min(1, 'Site description is required'),
  artistName: z.string().min(1, 'Artist name is required'),
  artistBio: z.string().min(1, 'Artist bio is required'),
  contactEmail: z.string().email('Must be a valid email').or(z.literal('')).optional(),
  socialLinks: z.object({
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    tumblr: z.string().optional(),
    etsy: z.string().optional(),
    linktree: z.string().optional()
  })
});

// Collection schemas
export const GalleryContentSchema = z.object({
  artworks: z.array(ArtworkSchema)
});

export const ShopContentSchema = z.object({
  items: z.array(ShopItemSchema)
});

export const EventsContentSchema = z.object({
  events: z.array(EventSchema)
});

// Type exports
export type Artwork = z.infer<typeof ArtworkSchema>;
export type ShopItem = z.infer<typeof ShopItemSchema>;
export type Event = z.infer<typeof EventSchema>;
export type PageContent = z.infer<typeof PageContentSchema>;
export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
export type GalleryContent = z.infer<typeof GalleryContentSchema>;
export type ShopContent = z.infer<typeof ShopContentSchema>;
export type EventsContent = z.infer<typeof EventsContentSchema>;