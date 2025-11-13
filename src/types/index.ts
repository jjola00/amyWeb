// Import shared constants
import { ARTWORK_CATEGORIES, type ArtworkCategory as SharedArtworkCategory } from '@/lib/constants'

// Sanity types
export interface SanityImage {
  _id: string
  url: string
  alt: string
  metadata?: {
    dimensions?: {
      width: number
      height: number
    }
    lqip?: string
  }
}

export interface SanitySlug {
  current: string
  _type: 'slug'
}

export interface SanityReference {
  _id: string
  _type: 'reference'
  _ref: string
}

export interface SanityBlock {
  _type: 'block'
  children: Array<{
    _type: 'span'
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: string
    _key: string
    [key: string]: any
  }>
  style?: string
  listItem?: string
  level?: number
}

// Main content types
export interface Category {
  _id: string
  name: string
  slug: SanitySlug
  description?: string
}

export interface Artwork {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
  image: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions?: {
          width: number
          height: number
        }
        lqip?: string
        blurHash?: string
        palette?: any
      }
    }
    alt: string
  }
  category?: Category
}

export interface Event {
  _id: string
  name: string
  slug: SanitySlug
  date: string // ISO date string
  status: 'upcoming' | 'done'
  description?: string
  featured: boolean
  externalLink?: string
  media?: Array<{
    _type: 'image' | 'file'
    _key: string
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions?: {
          width: number
          height: number
        }
        lqip?: string
        blurHash?: string
        palette?: any
      }
    }
    alt: string
    caption?: string
    // For video files
    thumbnail?: {
      asset: {
        _id: string
        url: string
        metadata?: {
          dimensions?: {
            width: number
            height: number
          }
          lqip?: string
          blurHash?: string
        }
      }
      alt?: string
    }
  }>
}

export interface BlogPost {
  _id: string
  title: string
  slug: SanitySlug
  excerpt?: string
  featuredImage?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions?: {
          width: number
          height: number
        }
        lqip?: string
      }
    }
    alt: string
  }
  content: Array<SanityBlock | {
    _type: 'image'
    asset: {
      _id: string
      url: string
    }
    alt: string
    caption?: string
  }>
  categories?: Category[]
  tags?: string[]
  publishedAt: string
  author: string
  featured: boolean
  relatedArtworks?: Artwork[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface Page {
  _id: string
  title: string
  slug: SanitySlug
  content: Array<SanityBlock>
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface SiteSettings {
  _id: string
  siteTitle: string
  siteDescription?: string
  artistName: string
  artistBio?: Array<SanityBlock>
  artistPhoto?: {
    asset: {
      _id: string
      url: string
    }
    alt: string
  }
  socialLinks?: {
    instagram?: string
    facebook?: string
    twitter?: string
    website?: string
    email?: string
    phone?: string
    linktree?: string
    tiktok?: string
    tumblr?: string
    etsy?: string
  }
  contactInfo?: {
    email: string
    phone?: string
    address?: string
    hours?: string
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: {
      asset: {
        _id: string
        url: string
      }
    }
    favicon?: {
      asset: {
        _id: string
        url: string
      }
    }
  }
  features?: {
    showPrices?: boolean
    enableCommissions?: boolean
    enableBlog?: boolean
    enableShop?: boolean
  }
}

// Shop types for Sanity CMS integration
export interface SanityShopCategory {
  _id: string
  name: string
  slug: SanitySlug
  description?: string
  sortOrder: number
  image?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions?: {
          width: number
          height: number
        }
        lqip?: string
        blurHash?: string
        palette?: any
      }
    }
    alt: string
  }
}

export interface SanityShopItem {
  _id: string
  name: string
  slug: SanitySlug
  description?: string
  price?: number
  etsyUrl?: string
  featured: boolean
  sortOrder: number
  image?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions?: {
          width: number
          height: number
        }
        lqip?: string
        blurHash?: string
        palette?: any
      }
    }
    alt: string
  }
  category?: SanityShopCategory
}

// Legacy types (for backwards compatibility during migration)
export type ArtworkCategory = SharedArtworkCategory

export interface ShopItem {
  id: string
  name: string
  imageUrl: string
  imageHint: string
  store: 'Etsy'
  etsyUrl?: string
}

// Export the categories array for use in components
export { ARTWORK_CATEGORIES } from '@/lib/constants'
