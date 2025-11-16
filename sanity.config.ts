import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { useEffect } from 'react'

// Import schemas
import artwork from './sanity/schemas/artwork'
import category from './sanity/schemas/category'
import about from './sanity/schemas/about'
import event from './sanity/schemas/event'
import shopItem from './sanity/schemas/shopItem'
import comic from './sanity/schemas/comic'

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
            
            S.divider(),
            
            // Comics Section
            S.listItem()
              .title('📖 Comics')
              .child(
                S.documentTypeList('comic')
                  .title('Comics')
                  .defaultOrdering([{ field: 'title', direction: 'asc' }])
              ),
            
            S.divider(),
            
            // Art Categories
            S.listItem()
              .title('🏷️ Art Categories')
              .child(S.documentTypeList('category')),
          ]),
    })
  ],
  
  schema: {
    types: [artwork, category, about, event, shopItem, comic],
  },
  
  // Mobile-friendly touch targets for iPad and touch devices
  studio: {
    components: {
      layout: (props) => {
        // Inject mobile-friendly styles for touch interfaces
        useEffect(() => {
          const style = document.createElement('style')
          style.id = 'mobile-touch-styles'
          style.textContent = `
            /* Touch-friendly buttons and inputs - 44px minimum per Apple HIG */
            [data-ui="Button"],
            [data-ui="TextInput"],
            [data-ui="Checkbox"],
            [data-ui="MenuButton"] {
              min-height: 44px !important;
              min-width: 44px !important;
            }
            
            /* Larger drag handles for reordering arrays (comic pages, etc.) */
            [data-ui="DragHandle"] {
              min-width: 44px !important;
              min-height: 44px !important;
              padding: 12px !important;
            }
            
            /* Prevent text selection during drag on touch devices */
            [data-ui="ArrayItem"] {
              -webkit-user-select: none;
              user-select: none;
            }
            
            /* Touch-friendly spacing for array item actions */
            [data-ui="ArrayItem"] [data-ui="MenuButton"] {
              min-height: 44px !important;
              min-width: 44px !important;
            }
            
            /* Larger touch targets for reference inputs */
            [data-ui="Autocomplete"] button,
            [data-ui="ReferenceInput"] button {
              min-height: 44px !important;
              min-width: 44px !important;
            }
          `
          document.head.appendChild(style)
          
          return () => {
            const existingStyle = document.getElementById('mobile-touch-styles')
            if (existingStyle) {
              document.head.removeChild(existingStyle)
            }
          }
        }, [])
        
        return props.renderDefault(props)
      }
    }
  },
  
  // 🔒 SECURITY: Studio authentication is handled by Sanity's built-in system
  // Users must be authenticated via Sanity to access the studio
})