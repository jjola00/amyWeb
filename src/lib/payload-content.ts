import { getPayload } from 'payload'
import config from '@payload-config'
import { getCachedContent, setCachedContent } from './performance'
import type { 
  GalleryContent, 
  ShopContent, 
  EventsContent, 
  SiteSettings,
  Artwork 
} from './schemas'

// Initialize Payload instance
let payload: any = null

async function getPayloadInstance() {
  if (!payload) {
    payload = await getPayload({ config })
  }
  return payload
}

// Load artworks from Payload CMS
export async function loadGalleryContentFromPayload(): Promise<GalleryContent> {
  const cacheKey = 'payload-gallery-content'
  
  // Check cache first (only in development for faster rebuilds)
  if (process.env.NODE_ENV === 'development') {
    const cached = getCachedContent<GalleryContent>(cacheKey)
    if (cached) return cached
  }
  
  try {
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Payload connection timeout')), 5000)
    )
    
    const payloadPromise = (async () => {
      const payloadInstance = await getPayloadInstance()
      
      // Fetch artworks from Payload CMS
      return await payloadInstance.find({
        collection: 'artworks',
        limit: 100, // Adjust as needed
        sort: '-createdAt', // Sort by newest first
      })
    })()
    
    const artworksResult = await Promise.race([payloadPromise, timeoutPromise])
    
    // Transform Payload data to match our schema
    const artworks: Artwork[] = artworksResult.docs.map((artwork: any) => ({
      id: artwork.id,
      title: artwork.title,
      description: artwork.description || '',
      imageUrl: typeof artwork.image === 'object' && artwork.image?.url 
        ? artwork.image.url 
        : artwork.image || '',
      imageHint: typeof artwork.image === 'object' && artwork.image?.alt 
        ? artwork.image.alt 
        : artwork.title,
      width: typeof artwork.image === 'object' && artwork.image?.width 
        ? artwork.image.width 
        : 800,
      height: typeof artwork.image === 'object' && artwork.image?.height 
        ? artwork.image.height 
        : 600,
      category: artwork.category || 'digital-fanart'
    }))
    
    const galleryContent: GalleryContent = { artworks }
    
    // Cache the result
    if (process.env.NODE_ENV === 'development') {
      setCachedContent(cacheKey, galleryContent)
    }
    
    return galleryContent
  } catch (error) {
    console.error('Error loading gallery content from Payload:', error)
    // Return fallback content
    return { artworks: [] }
  }
}

// Load site settings from Payload CMS
export async function loadSiteSettingsFromPayload(): Promise<SiteSettings> {
  const cacheKey = 'payload-site-settings'
  
  // Check cache first
  if (process.env.NODE_ENV === 'development') {
    const cached = getCachedContent<SiteSettings>(cacheKey)
    if (cached) return cached
  }
  
  try {
    const payloadInstance = await getPayloadInstance()
    
    // Fetch site settings from Payload CMS
    const settings = await payloadInstance.findGlobal({
      slug: 'settings'
    })
    
    // Transform Payload data to match our schema
    const siteSettings: SiteSettings = {
      siteTitle: settings.siteTitle || 'Beetlehead Designs',
      siteDescription: settings.siteDescription || 'Artist portfolio showcasing digital and traditional artwork',
      artistName: settings.artistName || 'Beetlehead',
      artistBio: settings.artistBio || 'Artist bio not available.',
      socialLinks: {
        instagram: settings.socialLinks?.instagram || '',
        tiktok: settings.socialLinks?.tiktok || '',
        tumblr: settings.socialLinks?.tumblr || '',
        etsy: settings.socialLinks?.etsy || ''
      },
      contactEmail: settings.contactEmail || ''
    }
    
    // Cache the result
    if (process.env.NODE_ENV === 'development') {
      setCachedContent(cacheKey, siteSettings)
    }
    
    return siteSettings
  } catch (error) {
    console.error('Error loading site settings from Payload:', error)
    // Return fallback content
    return {
      siteTitle: 'Beetlehead Designs',
      siteDescription: 'Artist portfolio showcasing digital and traditional artwork',
      artistName: 'Beetlehead',
      artistBio: 'Artist bio not available.',
      socialLinks: {
        instagram: '',
        tiktok: '',
        tumblr: '',
        etsy: ''
      },
      contactEmail: ''
    }
  }
}

// Check if Payload CMS has content, fallback to static files if needed
export async function loadGalleryContentHybrid(): Promise<GalleryContent> {
  try {
    // Try to load from Payload CMS first
    const payloadContent = await loadGalleryContentFromPayload()
    
    // If Payload has content, use it
    if (payloadContent.artworks.length > 0) {
      return payloadContent
    }
    
    // Otherwise, fallback to static content
    console.log('No content in Payload CMS, falling back to static content')
    const { loadGalleryContent } = await import('./content')
    return await loadGalleryContent()
  } catch (error) {
    console.error('Error in hybrid content loading:', error)
    // Final fallback to static content
    const { loadGalleryContent } = await import('./content')
    return await loadGalleryContent()
  }
}

// Check if Payload CMS has settings, fallback to static files if needed
export async function loadSiteSettingsHybrid(): Promise<SiteSettings> {
  try {
    // Try to load from Payload CMS first
    return await loadSiteSettingsFromPayload()
  } catch (error) {
    console.error('Error loading settings from Payload, using fallback:', error)
    // Fallback to static content
    const { loadSiteSettings } = await import('./content')
    return await loadSiteSettings()
  }
}