import { defineField, defineType } from 'sanity'

// Import the predefined categories from your shared constants
import { ARTWORK_CATEGORIES, getCategoryOptions } from '../../src/lib/constants'

export default defineType({
  name: 'category',
  title: 'Art Categories',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Select from existing or type to add a new category',
      options: {
        list: getCategoryOptions(),
        layout: 'dropdown'
      },
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