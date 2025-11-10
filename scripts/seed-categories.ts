// Run with: npm run seed-categories
// This script will create the categories from your defined types in Sanity

import { createClient } from '@sanity/client'

// Create a client with write permissions
const client = createClient({
  projectId: '67ufanvv',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  // Note: You would need a token with write permissions for this to work
  // For now, we'll create the categories manually in the Studio
})

// These are your predefined categories that should always exist
const PREDEFINED_CATEGORIES = [
  'Digital Fanart',
  'Digital Original Art', 
  'Traditional Original Art',
  'Mascot',
  'Commissions',
  'Sketches',
  'Comics'
] as const

async function seedCategories() {
  console.log('🌱 Seeding predefined categories...')
  
  for (const categoryName of PREDEFINED_CATEGORIES) {
    const slug = categoryName.toLowerCase().replace(/\s+/g, '-')
    
    try {
      // Check if category already exists
      const existing = await client.fetch(
        `*[_type == "category" && slug.current == $slug][0]`,
        { slug }
      )
      
      if (existing) {
        console.log(`✅ Category "${categoryName}" already exists`)
        continue
      }
      
      // Create the category
      const category = await client.create({
        _type: 'category',
        name: categoryName,
        slug: {
          current: slug,
          _type: 'slug'
        },
        description: getDefaultDescription(categoryName)
      })
      
      console.log(`✅ Created category: "${categoryName}" (${category._id})`)
    } catch (error) {
      console.error(`❌ Failed to create category "${categoryName}":`, error)
    }
  }
  
  console.log('🎉 Category seeding complete!')
}

function getDefaultDescription(categoryName: string): string {
  const descriptions: Record<string, string> = {
    'Digital Fanart': 'Digital artwork inspired by existing characters, games, anime, or media',
    'Digital Original Art': 'Original digital artwork and character designs',
    'Traditional Original Art': 'Original artwork created with traditional media like pencils, paints, or inks',
    'Mascot': 'Character designs for brands, teams, or organizations',
    'Commissions': 'Custom artwork created for clients',
    'Sketches': 'Quick drawings, studies, and concept work',
    'Comics': 'Comic strips, panels, and sequential art'
  }
  
  return descriptions[categoryName] || `Artwork in the ${categoryName} category`
}

// Export the categories for use in other files
export { PREDEFINED_CATEGORIES }

// Run the seeder
if (require.main === module) {
  seedCategories().catch(console.error)
}