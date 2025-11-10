import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Predefined image sizes for your portfolio
export const imagePresets = {
  // Gallery thumbnails - small cards
  thumbnail: (source: any) => urlFor(source)
    .width(400)
    .height(400)
    .fit('crop')
    .auto('format')
    .quality(80),

  // Gallery cards - main grid view (no cropping to preserve aspect ratio)
  card: (source: any) => urlFor(source)
    .width(600)
    .auto('format')
    .quality(85),

  // Lightbox/full view - high quality for viewing (no height restriction)
  fullsize: (source: any) => urlFor(source)
    .width(1200)
    .auto('format')
    .quality(90),

  // About page profile photo
  profile: (source: any) => urlFor(source)
    .width(400)
    .height(400)
    .fit('crop')
    .auto('format')
    .quality(85),

  // Mobile optimized versions
  cardMobile: (source: any) => urlFor(source)
    .width(300)
    .auto('format')
    .quality(80),
}

// Helper to get responsive image URLs
export function getResponsiveImageUrls(source: any) {
  return {
    thumbnail: imagePresets.thumbnail(source).url(),
    card: imagePresets.card(source).url(),
    cardMobile: imagePresets.cardMobile(source).url(),
    fullsize: imagePresets.fullsize(source).url(),
  }
}

// Get blur placeholder for loading
export function getBlurDataURL(source: any) {
  return source?.asset?.metadata?.lqip || undefined
}