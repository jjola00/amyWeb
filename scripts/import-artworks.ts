import { config } from 'dotenv'
import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { readdir } from 'fs/promises'
import path from 'path'

// Load environment variables from .env.local
config({ path: '.env.local' })

// Check for token first
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌ No SANITY_API_TOKEN found in environment variables')
  console.error('💡 Make sure your .env.local file has the token set')
  console.error('🔍 Current working directory:', process.cwd())
  process.exit(1)
}

console.log('🔑 Using token:', token.substring(0, 20) + '...')

// Sanity client for uploading with explicit token
const client = createClient({
  projectId: '67ufanvv',
  dataset: 'production',
  useCdn: false,
  token: token,
  apiVersion: '2023-05-03',
})

console.log('🏗️ Sanity client configured for project:', '67ufanvv')

// Creative artwork names for the IMG_ files
const creativeNames = [
  "Digital Dreams",
  "Neon Nightscape", 
  "Cyber Garden",
  "Electric Soul",
  "Pixel Paradise",
  "Digital Wilderness",
  "Tech Forest",
  "Binary Bloom",
  "Cyber Waves",
  "Digital Aurora",
  "Pixel Storm",
  "Electric Garden",
  "Neon Forest",
  "Digital Harmony",
  "Cyber Bloom",
  "Electric Dreams",
  "Pixel Waves",
  "Digital Storm", 
  "Neon Paradise",
  "Cyber Aurora",
  "Electric Forest",
  "Digital Waves",
  "Pixel Dreams",
  "Neon Storm",
  "Cyber Paradise",
  "Electric Bloom",
  "Digital Forest",
  "Pixel Aurora",
  "Neon Waves",
  "Cyber Dreams"
]

// Function to generate artwork title from filename
function generateTitle(filename: string, index: number): string {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "")
  
  // Use existing creative names for named files
  if (nameWithoutExt === "BedBugs") return "Bed Bugs"
  if (nameWithoutExt === "Killer Bee") return "Killer Bee"
  if (nameWithoutExt === "Rabbits") return "Rabbits"
  if (nameWithoutExt === "SnailMail") return "Snail Mail"
  
  // For IMG_ files, use creative names
  if (nameWithoutExt.startsWith("IMG_")) {
    return creativeNames[index] || `Digital Art ${index + 1}`
  }
  
  return nameWithoutExt
}

// Function to generate description
function generateDescription(title: string): string {
  const descriptions = [
    "A vibrant digital artwork showcasing creative expression and artistic vision.",
    "An original digital piece exploring color, form, and digital artistry.",
    "A unique digital creation blending imagination with technical skill.",
    "An expressive digital artwork demonstrating artistic creativity and style.",
    "A captivating digital piece that explores themes through visual storytelling.",
    "An original artwork created digitally with attention to detail and composition.",
    "A creative digital expression combining artistic vision with modern techniques.",
    "A striking digital artwork that showcases innovative artistic approaches.",
  ]
  
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

// Function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .trim()
}

async function uploadImageToSanity(imagePath: string, filename: string) {
  try {
    console.log(`📸 Uploading ${filename}...`)
    
    const stream = createReadStream(imagePath)
    const asset = await client.assets.upload('image', stream, {
      filename: filename,
    })
    
    console.log(`✅ Uploaded ${filename} - Asset ID: ${asset._id}`)
    return asset
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error)
    return null
  }
}

async function createArtworkDocument(asset: any, title: string, description: string) {
  try {
    const slug = createSlug(title)
    
    const artwork = {
      _type: 'artwork',
      title,
      slug: {
        _type: 'slug',
        current: slug
      },
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id
        },
        alt: title
      },
      description,
      category: {
        _type: 'reference', 
        _ref: 'digital-original-art' // Reference to Digital Original Art category
      }
    }
    
    const result = await client.create(artwork)
    console.log(`🎨 Created artwork: ${title}`)
    return result
  } catch (error) {
    console.error(`❌ Failed to create artwork ${title}:`, error)
    return null
  }
}

async function ensureCategoryExists() {
  try {
    // Check if Digital Original Art category exists
    const existingCategory = await client.fetch(
      `*[_type == "category" && _id == "digital-original-art"][0]`
    )
    
    if (!existingCategory) {
      console.log('📁 Creating Digital Original Art category...')
      
      const category = {
        _type: 'category',
        _id: 'digital-original-art',
        name: 'Digital Original Art',
        slug: {
          _type: 'slug',
          current: 'digital-original-art'
        },
        description: 'Original digital artwork and illustrations'
      }
      
      await client.createOrReplace(category)
      console.log('✅ Created Digital Original Art category')
    } else {
      console.log('✅ Digital Original Art category already exists')
    }
  } catch (error) {
    console.error('❌ Failed to create category:', error)
  }
}

async function importArtworks() {
  console.log('🚀 Starting artwork import process...')
  
  try {
    // Ensure category exists
    await ensureCategoryExists()
    
    const artworkFolder = path.join(process.cwd(), 'Original digital art')
    const files = await readdir(artworkFolder)
    const imageFiles = files.filter(file => 
      file.toLowerCase().endsWith('.png') || 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg')
    )
    
    console.log(`📁 Found ${imageFiles.length} image files to import`)
    
    let successCount = 0
    let imgIndex = 0
    
    for (const [index, filename] of imageFiles.entries()) {
      const imagePath = path.join(artworkFolder, filename)
      const title = generateTitle(filename, imgIndex)
      const description = generateDescription(title)
      
      if (filename.startsWith('IMG_')) imgIndex++
      
      console.log(`\n📋 Processing ${index + 1}/${imageFiles.length}: ${filename}`)
      console.log(`   Title: ${title}`)
      
      // Upload image to Sanity
      const asset = await uploadImageToSanity(imagePath, filename)
      if (!asset) continue
      
      // Create artwork document
      const artwork = await createArtworkDocument(asset, title, description)
      if (artwork) {
        successCount++
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    console.log(`\n🎉 Import completed!`)
    console.log(`✅ Successfully imported: ${successCount}/${imageFiles.length} artworks`)
    console.log(`🏠 Visit your studio: https://beetlehead-designs.sanity.studio`)
    console.log(`🎨 All artworks added to "Digital Original Art" category`)
    
  } catch (error) {
    console.error('❌ Import failed:', error)
  }
}

// Run the import
if (require.main === module) {
  importArtworks()
}

export default importArtworks