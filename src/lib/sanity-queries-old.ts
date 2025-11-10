import { sanityClient } from './sanity'

// Artwork queries
export const getArtworks = async () => {
  return await sanityClient.fetch(`
    *[_type == "artwork"] | order(createdAt desc) {
      _id,
      title,
      slug,
      description,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      dimensions,
      medium,
      yearCreated,
      price,
      available,
      featured,
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
            lqip
          }
        },
        alt
      },
      additionalImages[] {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      dimensions,
      medium,
      yearCreated,
      price,
      available,
      featured,
      category->{
        _id,
        name,
        slug
      },
      seo
    }
  `, { slug })
}

export const getFeaturedArtworks = async () => {
  return await sanityClient.fetch(`
    *[_type == "artwork" && featured == true] | order(createdAt desc) {
      _id,
      title,
      slug,
      description,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      dimensions,
      medium,
      yearCreated,
      price,
      available,
      category->{
        _id,
        name,
        slug
      }
    }
  `)
}

export const getArtworksByCategory = async (categorySlug: string) => {
  return await sanityClient.fetch(`
    *[_type == "artwork" && category->slug.current == $categorySlug] | order(createdAt desc) {
      _id,
      title,
      slug,
      description,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      dimensions,
      medium,
      yearCreated,
      price,
      available,
      featured,
      category->{
        _id,
        name,
        slug
      }
    }
  `, { categorySlug })
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

export const getCategoryBySlug = async (slug: string) => {
  return await sanityClient.fetch(`
    *[_type == "category" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      description,
      "artworks": *[_type == "artwork" && references(^._id)] | order(createdAt desc) {
        _id,
        title,
        slug,
        description,
        image {
          asset->{
            _id,
            url,
            metadata {
              dimensions
            }
          },
          alt
        },
        dimensions,
        medium,
        yearCreated,
        price,
        available,
        featured
      }
    }
  `, { slug })
}

// Page queries
export const getPages = async () => {
  return await sanityClient.fetch(`
    *[_type == "page"] | order(title asc) {
      _id,
      title,
      slug
    }
  `)
}

export const getPageBySlug = async (slug: string) => {
  return await sanityClient.fetch(`
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      content,
      seo
    }
  `, { slug })
}

// Blog queries
export const getBlogPosts = async () => {
  return await sanityClient.fetch(`
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      publishedAt,
      author,
      featured,
      categories[]->{
        _id,
        name,
        slug
      }
    }
  `)
}

export const getBlogPostBySlug = async (slug: string) => {
  return await sanityClient.fetch(`
    *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      },
      content,
      categories[]->{
        _id,
        name,
        slug
      },
      tags,
      publishedAt,
      author,
      featured,
      relatedArtworks[]->{
        _id,
        title,
        slug,
        image {
          asset->{
            _id,
            url
          },
          alt
        }
      },
      seo
    }
  `, { slug })
}

export const getFeaturedBlogPosts = async () => {
  return await sanityClient.fetch(`
    *[_type == "blog" && featured == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      publishedAt,
      author
    }
  `)
}

// Settings queries
export const getSiteSettings = async () => {
  return await sanityClient.fetch(`
    *[_type == "settings" && _id == "settings"][0] {
      _id,
      siteTitle,
      siteDescription,
      artistName,
      artistBio,
      artistPhoto {
        asset->{
          _id,
          url
        },
        alt
      },
      socialLinks,
      contactInfo,
      seo,
      features
    }
  `)
}

// Search functionality
export const searchContent = async (query: string) => {
  return await sanityClient.fetch(`
    {
      "artworks": *[_type == "artwork" && (title match $query || description match $query)] | order(title asc) [0...5] {
        _id,
        title,
        slug,
        image {
          asset->{
            _id,
            url
          },
          alt
        }
      },
      "blogPosts": *[_type == "blog" && (title match $query || excerpt match $query)] | order(publishedAt desc) [0...3] {
        _id,
        title,
        slug,
        excerpt,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    }
  `, { query: `${query}*` })
}