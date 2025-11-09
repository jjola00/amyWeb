import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import path from 'path'

export default buildConfig({
  // Admin configuration
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(process.cwd()),
    },
    meta: {
      titleSuffix: '- Beetlehead Designs',
      description: 'Artist Portfolio CMS',
    },
  },

  // Rich text editor
  editor: lexicalEditor(),

  // Collections
  collections: [
    // Users collection for authentication
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
        defaultColumns: ['email', 'name'],
      },
      access: {
        delete: () => false,
        update: ({ req }) => req.user?.email === 'admin@beetlehead.com',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'select',
          options: [
            {
              label: 'Admin',
              value: 'admin',
            },
            {
              label: 'Editor',
              value: 'editor',
            },
          ],
          defaultValue: 'editor',
          required: true,
        },
      ],
    },
    // Artworks collection for the portfolio
    {
      slug: 'artworks',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
        group: 'Content',
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'The title of your artwork',
          },
        },
        {
          name: 'slug',
          type: 'text',
          admin: {
            position: 'sidebar',
            description: 'URL-friendly version of the title (auto-generated)',
          },
          hooks: {
            beforeChange: [
              ({ value, originalDoc, data }) => {
                if (data?.title && !value) {
                  return data.title
                    .toLowerCase()
                    .replace(/ /g, '-')
                    .replace(/[^\w-]+/g, '')
                }
                return value
              },
            ],
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Main image for this artwork',
          },
        },
        {
          name: 'gallery',
          type: 'array',
          label: 'Additional Images',
          maxRows: 10,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
              admin: {
                description: 'Optional caption for this image',
              },
            },
          ],
        },
        {
          name: 'category',
          type: 'select',
          options: [
            {
              label: 'Digital Fanart',
              value: 'digital-fanart',
            },
            {
              label: 'Digital Original Art',
              value: 'digital-original',
            },
            {
              label: 'Traditional Original Art',
              value: 'traditional-original',
            },
            {
              label: 'Mascot',
              value: 'mascot',
            },
            {
              label: 'Commissions',
              value: 'commissions',
            },
            {
              label: 'Sketches',
              value: 'sketches',
            },
            {
              label: 'Comics',
              value: 'comics',
            },
          ],
          defaultValue: 'digital-fanart',
          required: true,
          admin: {
            position: 'sidebar',
            description: 'What type of artwork is this?',
          },
        },
        {
          name: 'description',
          type: 'richText',
          admin: {
            description: 'Tell the story behind this artwork',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured Artwork',
          defaultValue: false,
          admin: {
            position: 'sidebar',
            description: 'Show this artwork prominently on the homepage',
          },
        },
        {
          name: 'tags',
          type: 'array',
          label: 'Tags',
          maxRows: 10,
          fields: [
            {
              name: 'tag',
              type: 'text',
            },
          ],
          admin: {
            description: 'Add tags to help organize your artwork',
          },
        },
      ],
      timestamps: true,
      // Add database indexes for better query performance
      indexes: [
        {
          fields: ['category', 'featured'],
        },
        {
          fields: ['slug'],
        },
      ],
    },
    // Media collection for file uploads
    {
      slug: 'media',
      upload: {
        staticDir: path.resolve(process.cwd(), './media'),
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
          {
            name: 'desktop',
            width: 1440,
            height: undefined,
            position: 'centre',
          },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      admin: {
        group: 'Media',
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
          admin: {
            description: 'Describe this image for accessibility and SEO',
          },
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            description: 'Optional caption for this image',
          },
        },
      ],
    },
  ],

  // Global settings for site-wide content
  globals: [
    {
      slug: 'settings',
      label: 'Site Settings',
      admin: {
        group: 'Settings',
      },
      fields: [
        {
          name: 'siteTitle',
          type: 'text',
          required: true,
          defaultValue: 'Beetlehead Designs',
          admin: {
            description: 'The name of your website',
          },
        },
        {
          name: 'siteDescription',
          type: 'textarea',
          required: true,
          defaultValue: 'Artist portfolio showcasing digital and traditional artwork',
          admin: {
            description: 'Brief description of your website for SEO',
          },
        },
        {
          name: 'artistName',
          type: 'text',
          required: true,
          admin: {
            description: 'Your name as an artist',
          },
        },
        {
          name: 'artistBio',
          type: 'richText',
          admin: {
            description: 'Tell people about yourself and your art',
          },
        },
        {
          name: 'socialLinks',
          type: 'group',
          label: 'Social Media Links',
          fields: [
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram URL',
            },
            {
              name: 'tiktok',
              type: 'text',
              label: 'TikTok URL',
            },
            {
              name: 'tumblr',
              type: 'text',
              label: 'Tumblr URL',
            },
            {
              name: 'linktree',
              type: 'text',
              label: 'Linktree URL',
            },
            {
              name: 'etsy',
              type: 'text',
              label: 'Etsy Shop URL',
            },
          ],
        },
        {
          name: 'contactEmail',
          type: 'email',
          admin: {
            description: 'Email for commission inquiries',
          },
        },
      ],
    },
  ],

  // Server URL for absolute URLs
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002',

  // Secret for JWT
  secret: process.env.PAYLOAD_SECRET || '',

  // Database
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  // Sharp for image processing
  sharp,

  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },

  // Performance optimizations
  defaultDepth: 2, // Limit default population depth
  maxDepth: 5, // Maximum allowed depth to prevent deep queries

  // CORS settings - allow requests from the frontend
  cors: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002',
    'http://localhost:9002',
    'http://localhost:3000', // Common Next.js dev port
    'https://beetlehead-designs.vercel.app', // Production URL
  ].filter(Boolean),

  // CSRF settings - protect against cross-site request forgery
  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002',
    'http://localhost:9002',
    'http://localhost:3000', // Common Next.js dev port
    'https://beetlehead-designs.vercel.app', // Production URL
  ].filter(Boolean),
})