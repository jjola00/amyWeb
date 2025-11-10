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
      type: 'datetime',
      validation: rule => rule.required(),
      description: 'When the event takes place'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: rule => rule.required().max(200),
      description: 'Where the event takes place (e.g., "Downtown Gallery", "Convention Center Hall A")'
    }),
    defineField({
      name: 'status',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Planned', value: 'planned' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' }
        ],
        layout: 'radio'
      },
      initialValue: 'planned',
      validation: rule => rule.required(),
      description: 'Current status of the event'
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
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      date: 'date',
      status: 'status'
    },
    prepare({ title, subtitle, date, status }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : 'No date'
      
      return {
        title: title,
        subtitle: `${dateStr} • ${subtitle}`,
        media: () => '📅'
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
      title: 'Status',
      name: 'status',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'date', direction: 'asc' }
      ]
    }
  ]
})