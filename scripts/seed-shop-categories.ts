// Seed script to create default shop categories in Sanity Studio
// Run this once to populate the shop categories

import { createClient } from '@sanity/client'
import { SHOP_CATEGORIES } from '../sanity/schemas/shopCategory'

// Create Sanity client with explicit config
const client = createClient({
  projectId: '67ufanvv',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'sktXlR3UUq2MrlADKbL1Gt7lImtw3hFiTUq9nhVADKWwB2H29LSY6DWkF3gQewhlcnql6dnMLLh7f9JVOji98uwx4aEXKVX4DnEz7zigP1MwZcOC6I5SwyWKQZeOnr35AEqBIWmdcyy6INMR3kVKgNWYuEukjIrWkDPm3XjD1zzGrPXpJUsv'
})

async function seedShopCategories() {
  console.log('🌱 Seeding shop categories...')
  
  try {
    const categories = SHOP_CATEGORIES.map((name, index) => ({
      _type: 'shopCategory',
      name,
      slug: { 
        _type: 'slug', 
        current: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      },
      description: getCategoryDescription(name),
      sortOrder: index,
      isActive: true
    }))

    // Check if categories already exist
    const existingCategories = await client.fetch(`
      *[_type == "shopCategory"] {
        name
      }
    `)
    
    const existingNames = existingCategories.map((cat: any) => cat.name)
    
    // Filter out categories that already exist
    const newCategories = categories.filter(cat => !existingNames.includes(cat.name))
    
    if (newCategories.length === 0) {
      console.log('✅ All shop categories already exist')
      return
    }
    
    // Create the new categories
    const results = await Promise.all(
      newCategories.map(category => 
        client.create(category)
      )
    )
    
    console.log(`✅ Created ${results.length} shop categories:`)
    results.forEach((category: any) => {
      console.log(`   - ${category.name}`)
    })
    
  } catch (error) {
    console.error('❌ Error seeding shop categories:', error)
  }
}

function getCategoryDescription(name: string): string {
  const descriptions: Record<string, string> = {
    'Digital Art': 'Digital artwork downloads including illustrations, character art, and design files',
    'Keychains': 'Physical keychains, charms, and small accessories featuring original artwork',
    'Art Prints': 'High-quality physical prints of original artwork and illustrations',
    'Enamel Pins': 'Collectible enamel pins featuring unique designs and characters'
  }
  
  return descriptions[name] || `Items in the ${name} category`
}

// Run if called directly
if (require.main === module) {
  seedShopCategories()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export { seedShopCategories }