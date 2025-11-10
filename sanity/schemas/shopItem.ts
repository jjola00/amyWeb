import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'shopItem',
  title: 'Shop Item',
  type: 'document',
  icon: () => '🛍️',
  fields: [
    // Minimal fields per request: title, cover image, optional link, slug
    defineField({
      name: 'name',
      title: 'Item Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'A short label for the shop item (e.g., "Badge - Pink Cat")',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
        storeOriginalFilename: false,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Short accessible description for the image',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'etsyUrl',
      title: 'External Link (optional)',
      type: 'url',
      description: 'Optional link to the item on an external store (Etsy, etc.)',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
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
      description: 'Generate a slug from the item label to publish a page (if needed)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      link: 'etsyUrl',
    },
    prepare({ title, media, link }) {
      return {
        title: title || 'Untitled',
        subtitle: link ? 'External link attached' : 'No external link',
        media,
      }
    },
  },
})