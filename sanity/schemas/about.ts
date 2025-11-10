import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({
      name: 'artistPhoto',
      title: 'Artist Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text (for accessibility)',
          validation: (Rule) => Rule.required(),
        },
      ],
      description: 'Upload your photo here',
    }),
    defineField({
      name: 'artistBio',
      title: 'About You',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required(),
      description: 'Tell people about yourself and your art',
    }),
    defineField({
      name: 'artistName',
      title: 'Your Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'How should people call you?',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where are you based? (e.g., Dublin, Ireland)',
    }),
  ],
  
  preview: {
    select: {
      title: 'artistName',
      media: 'artistPhoto',
      subtitle: 'location',
    },
    prepare({ title, media, subtitle }) {
      return {
        title: title || 'About Page',
        subtitle: subtitle || 'Artist Info',
        media,
      }
    },
  },
})