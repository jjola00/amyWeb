// Shared constants used across the project
// This keeps your categories in sync between frontend and CMS

export const ARTWORK_CATEGORIES = [
  'Digital Fanart',
  'Digital Original Art', 
  'Traditional Original Art',
  'Mascot',
  'Commissions',
  'Sketches',
  'Comics'
] as const

export type ArtworkCategory = typeof ARTWORK_CATEGORIES[number]

// Category descriptions for the CMS
export const CATEGORY_DESCRIPTIONS: Record<ArtworkCategory, string> = {
  'Digital Fanart': 'Digital artwork inspired by existing characters, games, anime, or media',
  'Digital Original Art': 'Original digital artwork and character designs',
  'Traditional Original Art': 'Original artwork created with traditional media like pencils, paints, or inks',
  'Mascot': 'Character designs for brands, teams, or organizations',
  'Commissions': 'Custom artwork created for clients',
  'Sketches': 'Quick drawings, studies, and concept work',
  'Comics': 'Comic strips, panels, and sequential art'
}

// Helper function to get category slug
export function getCategorySlug(categoryName: ArtworkCategory): string {
  return categoryName.toLowerCase().replace(/\s+/g, '-')
}

// Helper function to get all categories as options for forms
export function getCategoryOptions() {
  return ARTWORK_CATEGORIES.map(cat => ({
    title: cat,
    value: cat
  }))
}