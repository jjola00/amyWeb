import { defineField, defineType } from 'sanity'

// Define the shop categories based on the current ones from the requirements
const SHOP_CATEGORIES = [
  'Digital Art',
  'Keychains', 
  'Art Prints',
  'Enamel Pins'
]

export default defineType({
  name: 'shopCategory',
  title: 'Shop Categories',
  type: 'document',
  icon: () => '🛍️',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Select from existing or type to add a new shop category',
      options: {
        list: SHOP_CATEGORIES.map(category => ({
          title: category,
          value: category
        })),
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
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'What type of items go in this category?',
      placeholder: 'e.g., Physical keychains and charms, Digital artwork downloads, etc.',
    }),
    defineField({
      name: 'image',
      title: 'Category Image (Optional)',
      type: 'image',
      description: 'Optional image to represent this category',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
        storeOriginalFilename: false,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text (for accessibility)',
          description: 'Briefly describe this category image',
          placeholder: 'Category image description...',
        },
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first in category lists',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active Category',
      type: 'boolean',
      description: 'Turn this off to hide the category (and its items) from your website',
      initialValue: true,
    }),
  ],
  
  preview: {
    select: {
      title: 'name',
      media: 'image',
      description: 'description',
      isActive: 'isActive',
      sortOrder: 'sortOrder',
    },
    prepare({ title, media, description, isActive, sortOrder }) {
      const status = !isActive ? ' (Inactive)' : '';
      const orderText = sortOrder !== undefined ? ` [${sortOrder}]` : '';
      return {
        title: `${title || 'Untitled Category'}${status}${orderText}`,
        subtitle: description || 'No description',
        media: media || undefined,
      }
    },
  },
  
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [
        {field: 'sortOrder', direction: 'asc'},
        {field: 'name', direction: 'asc'}
      ]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [
        {field: 'name', direction: 'asc'}
      ]
    },
    {
      title: 'Active First',
      name: 'activeFirst',
      by: [
        {field: 'isActive', direction: 'desc'},
        {field: 'sortOrder', direction: 'asc'}
      ]
    }
  ]
})

// Export categories for use in other parts of the app
export { SHOP_CATEGORIES }