import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Beetlehead Designs',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'Used for SEO meta description',
    }),
    defineField({
      name: 'artistName',
      title: 'Artist Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artistBio',
      title: 'Artist Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Tell people about yourself and your art',
    }),
    defineField({
      name: 'artistPhoto',
      title: 'Artist Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter/X URL',
          type: 'url',
        },
        {
          name: 'website',
          title: 'Personal Website',
          type: 'url',
        },
        {
          name: 'email',
          title: 'Contact Email',
          type: 'email',
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Contact Email',
          type: 'email',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Studio Address',
          type: 'text',
          rows: 3,
        },
        {
          name: 'hours',
          title: 'Studio Hours',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Default Meta Title',
          description: 'Fallback title for pages without specific SEO settings',
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Default Meta Description',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Default Social Media Image',
          description: 'Default image for social media sharing',
        },
        {
          name: 'favicon',
          type: 'image',
          title: 'Favicon',
          description: 'Small icon that appears in browser tabs',
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Site Features',
      type: 'object',
      fields: [
        {
          name: 'showPrices',
          title: 'Show Artwork Prices',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'enableCommissions',
          title: 'Enable Commission Requests',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'enableBlog',
          title: 'Enable Blog/News Section',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'enableShop',
          title: 'Enable Online Shop',
          type: 'boolean',
          initialValue: false,
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global website configuration',
      }
    },
  },
})