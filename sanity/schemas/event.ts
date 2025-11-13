import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: () => '📅',
  fields: [
    defineField({
      name: 'name',
      title: 'Event Name',
      type: 'string',
      validation: rule => rule.required().max(100),
      description: 'The name of the event (e.g., "Art Exhibition Opening", "Comic Con 2024")'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: rule => rule.required(),
      description: 'URL-friendly version of the event name'
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      validation: rule => rule.required(),
      description: 'When the event takes place (date only)'
    }),

    defineField({
      name: 'status',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Done', value: 'done' }
        ],
        layout: 'radio'
      },
      initialValue: 'upcoming',
      validation: rule => rule.required(),
      description: 'Is this event upcoming or already done?'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Brief description of the event (optional)'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
      description: 'Highlight this event on the website'
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Link to event page, tickets, or more information (optional)'
    }),
    defineField({
      name: 'media',
      title: 'Event Photos & Videos',
      type: 'array',
      of: [
        // Image type for photos (including HEIC)
        {
          type: 'image',
          title: 'Photo',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette'],
            storeOriginalFilename: false,
            accept: 'image/*,.heic,.HEIC', // Explicitly allow HEIC
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text (for accessibility)',
              validation: (Rule) => Rule.required(),
              description: 'Describe what this photo shows',
              placeholder: 'Photo from [event name]...',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption (optional)',
              description: 'Optional caption to display with the photo',
            }
          ]
        },
        // File type for videos (MOV, MP4, etc.)
        {
          type: 'file',
          title: 'Video',
          options: {
            accept: 'video/*,.mov,.MOV,.mp4,.MP4', // Allow video formats including MOV
            storeOriginalFilename: false,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Video description (for accessibility)',
              validation: (Rule) => Rule.required(),
              description: 'Describe what this video shows',
              placeholder: 'Video from [event name]...',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Video Caption (optional)',
              description: 'Optional caption to display with the video',
            },
            {
              name: 'thumbnail',
              type: 'image',
              title: 'Video Thumbnail (optional)',
              description: 'Custom thumbnail for the video. If not provided, a default play icon will be used.',
              options: {
                hotspot: true,
                metadata: ['blurhash', 'lqip'],
              }
            }
          ]
        }
      ],
      validation: rule => rule.max(10),
      description: 'Upload photos (including HEIC) and videos (including MOV) from the event (max 10 items total). Great for showcasing past events!'
    })
  ],
  preview: {
    select: {
      title: 'name',
      date: 'date',
      status: 'status',
      media: 'media'
    },
    prepare({ title, date, status, media }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : 'No date'
      const statusEmoji = status === 'upcoming' ? '🔴' : '✅'

      let mediaInfo = ''
      if (media && media.length > 0) {
        const photos = media.filter((item: any) => item._type === 'image').length
        const videos = media.filter((item: any) => item._type === 'file').length
        const parts = []
        if (photos > 0) parts.push(`${photos} photo${photos > 1 ? 's' : ''}`)
        if (videos > 0) parts.push(`${videos} video${videos > 1 ? 's' : ''}`)
        mediaInfo = parts.length > 0 ? ` (${parts.join(', ')})` : ''
      }

      // Use first image as preview, or first video thumbnail, or default icon
      let previewMedia = () => '📅'
      if (media && media.length > 0) {
        const firstImage = media.find((item: any) => item._type === 'image')
        const firstVideo = media.find((item: any) => item._type === 'file')

        if (firstImage) {
          previewMedia = firstImage
        } else if (firstVideo && firstVideo.thumbnail) {
          previewMedia = firstVideo.thumbnail
        }
      }

      return {
        title: `${statusEmoji} ${title}`,
        subtitle: `${dateStr}${mediaInfo}`,
        media: previewMedia
      }
    }
  },
  orderings: [
    {
      title: 'Event Date, Newest',
      name: 'dateDesc',
      by: [
        { field: 'date', direction: 'desc' }
      ]
    },
    {
      title: 'Event Date, Oldest',
      name: 'dateAsc',
      by: [
        { field: 'date', direction: 'asc' }
      ]
    },
    {
      title: 'Upcoming First',
      name: 'upcomingFirst',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'date', direction: 'asc' }
      ]
    },
    {
      title: 'Done First',
      name: 'doneFirst',
      by: [
        { field: 'status', direction: 'desc' },
        { field: 'date', direction: 'desc' }
      ]
    }
  ]
})