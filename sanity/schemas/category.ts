import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Art Categories',
  type: 'document',
  icon: () => '🏷️',
  
  // Prevent deletion if artworks reference this category
  validation: (Rule) => Rule.custom(async (value, context) => {
    // Only check during deletion attempts
    if (context.document?._id) {
      const client = context.getClient({ apiVersion: '2023-05-03' })
      const categoryId = context.document._id
      
      try {
        // Count artworks that reference this category
        const artworkCount = await client.fetch(
          `count(*[_type == "artwork" && references($categoryId)])`,
          { categoryId }
        )
        
        if (artworkCount > 0) {
          return {
            message: `Cannot delete: ${artworkCount} artwork${artworkCount > 1 ? 's' : ''} reference${artworkCount === 1 ? 's' : ''} this category. Please reassign or delete those artworks first.`,
            level: 'error'
          }
        }
      } catch (error) {
        console.error('Error checking category references:', error)
      }
    }
    return true
  }),
  
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Type any category name you want',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'Click generate to create the URL slug from the name',
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'text',
      rows: 2,
      description: 'What type of art goes in this category? (optional)',
      placeholder: 'e.g., Digital illustrations, hand-drawn artwork, character designs...',
    }),
  ],
  
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Category',
        subtitle: subtitle || 'No description',
      }
    },
  },
})