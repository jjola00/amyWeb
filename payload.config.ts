import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    // Users collection for authentication
    {
      slug: 'users',
      auth: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    // Artworks collection for the portfolio
    {
      slug: 'artworks',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Digital Fanart', value: 'digital-fanart' },
            { label: 'Digital Original', value: 'digital-original' },
            { label: 'Traditional', value: 'traditional' },
          ],
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    // Media collection for file uploads
    {
      slug: 'media',
      upload: {
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
          {
            name: 'card',
            width: 768,
            height: 1024,
            position: 'centre',
          },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  
  // Database adapter
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  
  // If you want to resize images, crop, set focal point, etc.
  sharp,
})