import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  icon: () => '🎨',
  fields: [
    defineField({
      name: 'title',
      title: 'Name of Drawing',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'What do you want to call this artwork?',
    }),
    defineField({
      name: 'image',
      title: 'Upload Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true, // Smart cropping
        metadata: ['blurhash', 'lqip', 'palette'], // Low-quality placeholders for optimization
        storeOriginalFilename: false, // Privacy
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text (for accessibility)',
          validation: (Rule) => Rule.required(),
          description: 'Briefly describe what this artwork shows (e.g., "Digital illustration of a pink-haired character")',
          placeholder: 'Digital illustration of...',
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Tag/Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
      description: 'What type of art is this? (Mascot, Comic, etc.)',
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'text',
      rows: 3,
      description: 'Tell us about this artwork (optional)',
    }),
    // Auto-generated slug from title
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'Click generate to create the URL slug from the artwork title',
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category.name',
    },
    prepare({ title, media, category }) {
      return {
        title: title || 'Untitled',
        subtitle: category || 'No category',
        media,
      }
    },
  },
})