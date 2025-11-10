import { getShopItems, getShopCategories } from './sanity-queries'
import type { SanityShopItem, SanityShopCategory, ShopItem } from '@/types'
import { urlFor } from './sanityImageUrl'

// Convert Sanity shop item to legacy format for backwards compatibility
function convertSanityShopItemToLegacy(item: SanityShopItem): ShopItem {
  // Provide fallback for missing images
  const imageUrl = item.image?.asset?.url 
    ? urlFor(item.image.asset).width(400).height(400).url()
    : 'https://placehold.co/400x400/222222/999999?text=' + encodeURIComponent(item.name);
    
  return {
    id: item._id,
    name: item.name,
    imageUrl,
    imageHint: item.image?.alt || item.name,
    store: 'Etsy' as const,
    etsyUrl: item.etsyUrl
  }
}

// Get shop items from Sanity CMS with fallback to JSON
export async function getSanityShopItems(): Promise<SanityShopItem[]> {
  try {
    const items = await getShopItems()
    return items
  } catch (error) {
    console.error('Error fetching shop items from Sanity:', error)
    return []
  }
}

// Get shop categories from Sanity CMS
export async function getSanityShopCategories(): Promise<SanityShopCategory[]> {
  try {
    const categories = await getShopCategories()
    return categories
  } catch (error) {
    console.error('Error fetching shop categories from Sanity:', error)
    return []
  }
}

// Get shop items in legacy format for existing components
export async function getShopItemsLegacyFormat(): Promise<ShopItem[]> {
  try {
    const sanityItems = await getShopItems()
    const legacyItems = sanityItems.map(convertSanityShopItemToLegacy)
    
    // Duplicate items for carousel effect (as done in original)
    const duplicatedItems: ShopItem[] = [
      ...legacyItems,
      ...legacyItems.map((item: ShopItem) => ({ ...item, id: `${item.id}-dup1` })),
      ...legacyItems.map((item: ShopItem) => ({ ...item, id: `${item.id}-dup2` }))
    ]
    
    return duplicatedItems
  } catch (error) {
    console.error('Error converting Sanity items to legacy format:', error)
    return []
  }
}

// Get items by category with legacy format
export async function getShopItemsByCategoryLegacyFormat(categorySlug?: string): Promise<ShopItem[]> {
  try {
    const sanityItems = await getShopItems()
    // shopItem no longer references categories in the simplified CMS.
    if (categorySlug) {
      console.warn('Category filtering requested but shop items do not reference categories — returning all items.')
    }

    return sanityItems.map(convertSanityShopItemToLegacy)
  } catch (error) {
    console.error('Error fetching shop items by category:', error)
    return []
  }
}