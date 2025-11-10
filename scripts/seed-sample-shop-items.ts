// Seed script to create sample shop items in Sanity Studio
// Run this after seeding categories to test the shop functionality

import { createClient } from '@sanity/client'

// Create Sanity client with explicit config
const client = createClient({
  projectId: '67ufanvv',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'sktXlR3UUq2MrlADKbL1Gt7lImtw3hFiTUq9nhVADKWwB2H29LSY6DWkF3gQewhlcnql6dnMLLh7f9JVOji98uwx4aEXKVX4DnEz7zigP1MwZcOC6I5SwyWKQZeOnr35AEqBIWmdcyy6INMR3kVKgNWYuEukjIrWkDPm3XjD1zzGrPXpJUsv'
})

async function seedSampleShopItems() {
  console.log('🛍️ Seeding sample shop items...')
  
  try {
    // First, get the categories to reference them
    const categories = await client.fetch(`
      *[_type == "shopCategory"] {
        _id,
        name,
        slug
      }
    `)
    
    if (categories.length === 0) {
      console.log('⚠️ No shop categories found. Please run seed-shop-categories.ts first.')
      return
    }
    
    // Create sample items for each category
    const sampleItems = [
      {
        name: 'Cute Cat Digital Print',
        description: 'Adorable digital illustration of a fluffy cat perfect for printing or digital use',
        price: 5.99,
        category: 'Digital Art',
        featured: true,
        sortOrder: 1,
        etsyUrl: 'https://etsy.com/listing/example-cat-print'
      },
      {
        name: 'Rainbow Butterfly Keychain',
        description: 'Colorful acrylic keychain featuring a beautiful butterfly design',
        price: 8.99,
        category: 'Keychains',
        featured: false,
        sortOrder: 2,
        etsyUrl: 'https://etsy.com/listing/example-butterfly-keychain'
      },
      {
        name: 'Fantasy Dragon Art Print',
        description: 'High-quality print of original fantasy dragon artwork, perfect for framing',
        price: 15.99,
        category: 'Art Prints',
        featured: true,
        sortOrder: 0, // Lower number = appears first
        etsyUrl: 'https://etsy.com/listing/example-dragon-print'
      },
      {
        name: 'Magical Unicorn Enamel Pin',
        description: 'Sparkly enamel pin featuring a magical unicorn design with rainbow mane',
        price: 12.99,
        category: 'Enamel Pins',
        featured: false,
        sortOrder: 3
      }
    ]
    
    const itemsToCreate = []
    
    for (const item of sampleItems) {
      // Find the category reference
      const category = categories.find((cat: any) => cat.name === item.category)
      if (!category) {
        console.log(`⚠️ Category "${item.category}" not found, skipping item "${item.name}"`)
        continue
      }
      
      // Check if item already exists
      const existingItem = await client.fetch(`
        *[_type == "shopItem" && name == $name][0]
      `, { name: item.name })
      
      if (existingItem) {
        console.log(`   - Item "${item.name}" already exists, skipping`)
        continue
      }
      
      const shopItem = {
        _type: 'shopItem',
        name: item.name,
        slug: { 
          _type: 'slug', 
          current: item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        },
        description: item.description,
        price: item.price,
        etsyUrl: item.etsyUrl,
        featured: item.featured,
        sortOrder: item.sortOrder,
        isActive: true,
        category: {
          _type: 'reference',
          _ref: category._id
        }
        // Note: Image will need to be added manually through the Studio
      }
      
      itemsToCreate.push(shopItem)
    }
    
    if (itemsToCreate.length === 0) {
      console.log('✅ All sample shop items already exist or no valid categories found')
      return
    }
    
    // Create the new items
    const results = await Promise.all(
      itemsToCreate.map(item => 
        client.create(item)
      )
    )
    
    console.log(`✅ Created ${results.length} sample shop items:`)
    results.forEach((item: any) => {
      console.log(`   - ${item.name}`)
    })
    
    console.log('\n📝 Note: You\'ll need to add images to these items through the Sanity Studio interface.')
    
  } catch (error) {
    console.error('❌ Error seeding sample shop items:', error)
  }
}

// Run if called directly
if (require.main === module) {
  seedSampleShopItems()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export { seedSampleShopItems }