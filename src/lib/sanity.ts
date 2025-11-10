import { createClient } from '@sanity/client'
import { createClient as createNextClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

// Client for general queries
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Client for real-time and mutations (if needed)
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Next-sanity client for server-side rendering
export const client = createNextClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})