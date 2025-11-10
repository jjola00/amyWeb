import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

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
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // About Page (singleton)
            S.listItem()
              .title('About Page')
              .child(S.document().schemaType('aboutPage').documentId('about')),
            
            S.divider(),
            
            // Artworks
            S.listItem()
              .title('🎨 Artworks')
              .child(S.documentTypeList('artwork')),
            
            // Art Categories
            S.listItem()
              .title('🏷️ Art Categories')
              .child(S.documentTypeList('category')),
          ]),
    }),
    visionTool(),
  ],
  
  schema: {
    types: [artwork, category, about],
  },
  
  // 🔒 SECURITY: Authentication configuration
  auth: {
    // Use Sanity's built-in authentication
    mode: 'replace',
    providers: [
      {
        name: 'sanity',
        title: 'Login with Sanity',
        url: 'https://api.sanity.io/v2021-10-21/auth/login',
      }
    ]
  },
  
  // 🔒 SECURITY: Document access control
  document: {
    // Custom document actions (optional)
    actions: (prev, context) => {
      // Only allow certain actions for authenticated users
      if (context.currentUser) {
        return prev
      }
      return []
    }
  }
})