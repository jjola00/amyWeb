import { loadShopContent } from './content';
import type { ShopItem } from '@/types';

// For backward compatibility, provide a function to get shop items
export async function getShopItems(): Promise<ShopItem[]> {
  const content = await loadShopContent();
  // Duplicate items for carousel effect as in original
  const baseItems = content.items;
  const duplicatedItems = [
    ...baseItems,
    ...baseItems.map(item => ({ ...item, id: `${item.id}-dup1` })),
    ...baseItems.map(item => ({ ...item, id: `${item.id}-dup2` }))
  ];
  return duplicatedItems;
}

// Legacy export for components that expect synchronous access
// DEPRECATED: Do not use `shopItems` directly. This is an empty array and will break components expecting data.
// Please migrate to using the async `getShopItems()` function instead.
export const shopItems: ShopItem[] = [];