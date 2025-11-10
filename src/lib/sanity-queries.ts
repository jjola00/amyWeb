import { sanityClient } from './sanity'

// Artwork queries with image optimization metadata
export const getArtworks = async () => {
  return await sanityClient.fetch(`
    *[_type == "artwork"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip,
            blurHash,
            palette
          }
        },
        alt
      },
      category->{
        _id,
        name,
        slug
      }
    }
  `)
}

export const getArtworkBySlug = async (slug: string) => {
  return await sanityClient.fetch(`
    *[_type == "artwork" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip,
            blurHash,
            palette
          }
        },
        alt
      },
      category->{
        _id,
        name,
        slug
      }
    }
  `, { slug })
}

// Category queries
export const getCategories = async () => {
  return await sanityClient.fetch(`
    *[_type == "category"] | order(name asc) {
      _id,
      name,
      slug,
      description,
      "artworkCount": count(*[_type == "artwork" && references(^._id)])
    }
  `)
}

export const getArtworksByCategory = async (categorySlug: string) => {
  return await sanityClient.fetch(`
    *[_type == "artwork" && category->slug.current == $categorySlug] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip,
            blurHash,
            palette
          }
        },
        alt
      },
      category->{
        _id,
        name,
        slug
      }
    }
  `, { categorySlug })
}

// About page queries
export const getAboutPage = async () => {
  return await sanityClient.fetch(`
    *[_type == "aboutPage" && _id == "about"][0] {
      _id,
      artistName,
      artistPhoto {
        asset->{
          _id,
          url
        },
        alt
      },
      artistBio,
      location
    }
  `)
}

// Event queries
export const getEvents = async () => {
  return await sanityClient.fetch(`
    *[_type == "event"] | order(date asc) {
      _id,
      name,
      slug,
      date,
      location,
      status,
      description,
      featured,
      externalLink
    }
  `)
}

export const getUpcomingEvents = async () => {
  return await sanityClient.fetch(`
    *[_type == "event" && status in ["upcoming", "planned"] && date >= now()] | order(date asc) {
      _id,
      name,
      slug,
      date,
      location,
      status,
      description,
      featured,
      externalLink
    }
  `)
}

export const getFeaturedEvents = async () => {
  return await sanityClient.fetch(`
    *[_type == "event" && featured == true && date >= now()] | order(date asc) {
      _id,
      name,
      slug,
      date,
      location,
      status,
      description,
      featured,
      externalLink
    }
  `)
}

export const getEventBySlug = async (slug: string) => {
  return await sanityClient.fetch(`
    *[_type == "event" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      date,
      location,
      status,
      description,
      featured,
      externalLink
    }
  `, { slug })
}