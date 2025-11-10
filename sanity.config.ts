import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array'

// Import schemas
import artwork from './sanity/schemas/artwork'
import category from './sanity/schemas/category'
import about from './sanity/schemas/about'
import categoryManager from './sanity/schemas/categoryManager'

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
            // Setup Tool - Make it prominent
            S.listItem()
              .title('🚀 Setup Categories')
              .child(
                S.document()
                  .schemaType('categoryManager')
                  .documentId('setup')
              ),
            
            S.divider(),
            
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
    colorInput(),
    imageHotspotArrayPlugin(),
  ],
  
  schema: {
    types: [categoryManager, artwork, category, about],
  },
})