import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// Import schemas
import artwork from './sanity/schemas/artwork'
import category from './sanity/schemas/category'
import about from './sanity/schemas/about'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '67ufanvv'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'beetlehead-designs',
  title: 'Beetlehead Designs - Artist Portfolio',
  projectId,
  dataset,
  
  // Using basic deskTool without custom structure
  plugins: [
    deskTool()
  ],
  
  schema: {
    types: [artwork, category, about],
  },
  
  // 🔒 SECURITY: Studio authentication is handled by Sanity's built-in system
  // Users must be authenticated via Sanity to access the studio
})