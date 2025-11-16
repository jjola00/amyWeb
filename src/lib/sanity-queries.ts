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
      },
      comic->{
        _id,
        title,
        slug,
        pages
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
      status,
      description,
      featured,
      externalLink,
      media[] {
        _type,
        _key,
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
        alt,
        caption,
        thumbnail {
          asset->{
            _id,
            url,
            metadata {
              dimensions,
              lqip,
              blurHash
            }
          },
          alt
        }
      }
    }
  `)
}

export const getUpcomingEvents = async () => {
  return await sanityClient.fetch(`
    *[_type == "event" && status == "upcoming" && date >= now()] | order(date asc) {
      _id,
      name,
      slug,
      date,
      status,
      description,
      featured,
      externalLink,
      media[] {
        _type,
        _key,
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
        alt,
        caption,
        thumbnail {
          asset->{
            _id,
            url,
            metadata {
              dimensions,
              lqip,
              blurHash
            }
          },
          alt
        }
      }
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
      status,
      description,
      featured,
      externalLink,
      media[] {
        _type,
        _key,
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
        alt,
        caption,
        thumbnail {
          asset->{
            _id,
            url,
            metadata {
              dimensions,
              lqip,
              blurHash
            }
          },
          alt
        }
      }
    }
  `, { slug })
}

// Shop queries with image optimization metadata
export const getShopItems = async () => {
  return await sanityClient.fetch(`
    *[_type == "shopItem"] | order(name asc) {
      _id,
      name,
      slug,
      etsyUrl,
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
      }
    }
  `)
}

export const getShopItemsByCategory = async (categorySlug: string) => {
  // shopItem no longer references categories in the simplified CMS.
  // Return all shop items and ignore category filter (keeps API compatibility).
  return await sanityClient.fetch(`
    *[_type == "shopItem"] | order(name asc) {
      _id,
      name,
      slug,
      etsyUrl,
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
      }
    }
  `)
}



export const getShopItemBySlug = async (slug: string) => {
  return await sanityClient.fetch(`
    *[_type == "shopItem" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      etsyUrl,
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
      }
    }
  `, { slug })
}

// Comic queries
export const getComics = async () => {
  return await sanityClient.fetch(`
    *[_type == "comic"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      pages[] {
        pageNumber,
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
        caption
      },
      publishedDate,
      featured
    }
  `)
}

export const getComicBySlug = async (slug: string) => {
  return await sanityClient.fetch(`
    *[_type == "comic" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      pages[] | order(pageNumber asc) {
        pageNumber,
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
        caption
      },
      publishedDate,
      featured
    }
  `, { slug })
}