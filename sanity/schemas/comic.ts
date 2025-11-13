import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'comic',
  title: 'Comic',
  type: 'document',
  icon: () => '📖',
  fields: [
    defineField({
      name: 'title',
      title: 'Comic Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Title of this comic (e.g., "My Adventure Comic", "Comic1")',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'Generate a slug from the comic title',
    }),
    defineField({
      name: 'description',
      title: 'Comic Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of this comic (optional)',
    }),
    defineField({
      name: 'pages',
      title: 'Comic Pages',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'comicPage',
          title: 'Comic Page',
          fields: [
            {
              name: 'pageNumber',
              title: 'Page Number',
              type: 'number',
              validation: (Rule) => Rule.required().positive(),
              description: 'Order of this page (1, 2, 3, etc.) - you can reorder these!',
            },
            {
              name: 'image',
              title: 'Page Image',
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
                  validation: (Rule) => Rule.required(),
                  description: 'Describe what happens on this page',
                  placeholder: 'Page showing...',
                },
              ],
            },
            {
              name: 'caption',
              title: 'Page Caption (Optional)',
              type: 'string',
              description: 'Optional caption or note for this page',
            }
          ],
          preview: {
            select: {
              pageNumber: 'pageNumber',
              media: 'image',
              caption: 'caption'
            },
            prepare({ pageNumber, media, caption }) {
              return {
                title: `Page ${pageNumber}`,
                subtitle: caption || 'Comic page',
                media
              }
            }
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Upload the pages of your comic in order. You can drag to reorder them!',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      description: 'When was this comic created? (optional)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Comic',
      type: 'boolean',
      initialValue: false,
      description: 'Highlight this comic on the gallery page',
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      media: 'pages.0.image', // Use first page as cover
      pages: 'pages',
      featured: 'featured'
    },
    prepare({ title, media, pages, featured }) {
      const pageCount = pages ? pages.length : 0;
      const featuredText = featured ? ' ⭐' : '';
      
      return {
        title: `${title}${featuredText}`,
        subtitle: `${pageCount} pages`,
        media: media || (() => '📖')
      }
    },
  },
  
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Published Date',
      name: 'publishedDate',
      by: [
        { field: 'publishedDate', direction: 'desc' }
      ]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
})