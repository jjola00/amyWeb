import { promises as fs } from 'fs';
import path from 'path';
import { getCachedContent, setCachedContent } from './performance';
import { 
  GalleryContentSchema, 
  ShopContentSchema, 
  EventsContentSchema, 
  PageContentSchema,
  SiteSettingsSchema,
  type GalleryContent,
  type ShopContent,
  type EventsContent,
  type PageContent,
  type SiteSettings
} from './schemas';

// Content loading utilities with validation and caching
export async function loadGalleryContent(): Promise<GalleryContent> {
  const cacheKey = 'gallery-content';
  
  // Check cache first (only in development for faster rebuilds)
  if (process.env.NODE_ENV === 'development') {
    const cached = getCachedContent<GalleryContent>(cacheKey);
    if (cached) return cached;
  }
  
  try {
    const filePath = path.join(process.cwd(), 'content/gallery/artworks.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const rawData = JSON.parse(fileContent);
    
    // Validate content using Zod schema
    const validatedData = GalleryContentSchema.parse(rawData);
    
    // Cache the result
    if (process.env.NODE_ENV === 'development') {
      setCachedContent(cacheKey, validatedData);
    }
    
    return validatedData;
  } catch (error) {
    console.error('Error loading gallery content:', error);
    // Return fallback content
    return { artworks: [] };
  }
}

export async function loadShopContent(): Promise<ShopContent> {
  try {
    const filePath = path.join(process.cwd(), 'content/shop/items.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const rawData = JSON.parse(fileContent);
    
    // Validate content using Zod schema
    const validatedData = ShopContentSchema.parse(rawData);
    return validatedData;
  } catch (error) {
    console.error('Error loading shop content:', error);
    // Return fallback content
    return { items: [] };
  }
}

export async function loadEventsContent(): Promise<EventsContent> {
  try {
    const filePath = path.join(process.cwd(), 'content/events/events.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const rawData = JSON.parse(fileContent);
    
    // Validate content using Zod schema
    const validatedData = EventsContentSchema.parse(rawData);
    return validatedData;
  } catch (error) {
    console.error('Error loading events content:', error);
    // Return fallback content
    return { events: [] };
  }
}

export async function loadPageContent(pageName: string): Promise<PageContent> {
  try {
    const filePath = path.join(process.cwd(), `content/pages/${pageName}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const rawData = JSON.parse(fileContent);
    
    // Validate content using Zod schema
    const validatedData = PageContentSchema.parse(rawData);
    return validatedData;
  } catch (error) {
    console.error(`Error loading page content for ${pageName}:`, error);
    // Return fallback content
    return { 
      title: 'Page Not Found', 
      content: 'Content could not be loaded.' 
    };
  }
}

export async function loadSiteSettings(): Promise<SiteSettings> {
  try {
    const filePath = path.join(process.cwd(), 'content/settings/general.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const rawData = JSON.parse(fileContent);
    
    // Validate content using Zod schema
    const validatedData = SiteSettingsSchema.parse(rawData);
    return validatedData;
  } catch (error) {
    console.error('Error loading site settings:', error);
    // Return fallback content
    return {
      siteTitle: 'Artist Portfolio',
      siteDescription: 'Digital and traditional art portfolio',
      artistName: 'Artist',
      artistBio: 'Artist bio not available.',
      contactEmail: '',
      socialLinks: {}
    };
  }
}

// Re-export types for convenience
export type { 
  GalleryContent, 
  ShopContent, 
  EventsContent, 
  PageContent, 
  SiteSettings,
  Artwork,
  ShopItem,
  Event
} from './schemas';