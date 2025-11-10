import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array'

// Import schemas
import artwork from './sanity/schemas/artwork'
import page from './sanity/schemas/page'
import settings from './sanity/schemas/settings'
import category from './sanity/schemas/category'
import blog from './sanity/schemas/blog'

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
            // Settings (singleton)
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('settings').documentId('settings')),
            
            S.divider(),
            
            // Artworks
            S.listItem()
              .title('Artworks')
              .child(S.documentTypeList('artwork')),
            
            // Art Categories
            S.listItem()
              .title('Art Categories')
              .child(S.documentTypeList('category')),
            
            // Pages
            S.listItem()
              .title('Pages')
              .child(S.documentTypeList('page')),
            
            // Blog Posts
            S.listItem()
              .title('Blog Posts')
              .child(S.documentTypeList('blog')),
          ]),
    }),
    visionTool(),
    colorInput(),
    imageHotspotArrayPlugin(),
  ],
  
  schema: {
    types: [artwork, page, settings, category, blog],
  },
})