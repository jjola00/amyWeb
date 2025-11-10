import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// Import schemas
import artwork from './sanity/schemas/artwork'
import category from './sanity/schemas/category'
import about from './sanity/schemas/about'
import event from './sanity/schemas/event'
import shopItem from './sanity/schemas/shopItem'
import shopCategory from './sanity/schemas/shopCategory'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '67ufanvv'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'beetlehead-designs',
  title: 'Beetlehead Designs - Artist Portfolio',
  projectId,
  dataset,
  
  // Using basic deskTool with custom structure
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // About Page (singleton)
            S.listItem()
              .title('📄 About Page')
              .child(S.document().schemaType('aboutPage').documentId('about')),
            
            S.divider(),
            
            // Artworks
            S.listItem()
              .title('🎨 Artworks')
              .child(S.documentTypeList('artwork')),
            
            // Events
            S.listItem()
              .title('📅 Events')
              .child(
                S.documentTypeList('event')
                  .title('Events')
                  .defaultOrdering([{ field: 'date', direction: 'desc' }])
              ),
            
            S.divider(),
            
            // Shop Management
            S.listItem()
              .title('🛍️ Shop Items')
              .child(
                S.documentTypeList('shopItem')
                  .title('Shop Items')
                  .defaultOrdering([{ field: 'name', direction: 'asc' }])
              ),
            
            S.listItem()
              .title('🏷️ Shop Categories')
              .child(
                S.documentTypeList('shopCategory')
                  .title('Shop Categories')
                  .defaultOrdering([{ field: 'name', direction: 'asc' }])
              ),
            
            S.divider(),
            
            // Art Categories
            S.listItem()
              .title('� Art Categories')
              .child(S.documentTypeList('category')),
          ]),
    })
  ],
  
  schema: {
    types: [artwork, category, about, event, shopItem, shopCategory],
  },
  
  // 🔒 SECURITY: Studio authentication is handled by Sanity's built-in system
  // Users must be authenticated via Sanity to access the studio
})