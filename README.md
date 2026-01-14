# Beetlehead Designs Portfolio Website

A modern, full-featured portfolio website built with Next.js 15, featuring a dynamic gallery, comic reader, event management, and integrated shop functionality.

## Live Site

https://beetlehead-designs.vercel.app/

## Features

- **Dynamic Gallery** - Filterable artwork gallery with categories and lightbox viewing
- **Comic Reader** - Interactive comic reader with two-page spread layout and keyboard navigation
- **Event Management** - Showcase upcoming and past events with photo galleries
- **Shop Integration** - Display products with Etsy integration
- **Contact Form** - Built-in contact form with email integration
- **CMS Integration** - Powered by Sanity CMS for easy content management
- **Responsive Design** - Fully responsive across all devices
- **Performance Optimized** - Image optimization, lazy loading, and blur placeholders
- **Accessibility** - WCAG compliant with screen reader support

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **CMS:** Sanity
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Email:** EmailJS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/jjola00/amyWeb.git
cd amyWeb
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
- Sanity project ID and dataset
- EmailJS credentials
- Other API keys as needed

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

## Available Scripts

- `npm run dev` - Start development server on port 9002
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run check` - Run both typecheck and lint
- `npm run build:analyze` - Build with bundle analyzer

## Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   │   ├── gallery/      # Gallery and comic reader components
│   │   ├── events/       # Event-related components
│   │   ├── layout/       # Layout components (header, footer)
│   │   └── ui/           # Reusable UI components
│   ├── lib/              # Utility functions and configurations
│   ├── types/            # TypeScript type definitions
│   └── hooks/            # Custom React hooks
├── sanity/               # Sanity CMS schemas and configuration
├── content/              # Static content files
└── public/               # Static assets
```

## Content Management

This site uses Sanity CMS for content management. To access the Sanity Studio:

1. Navigate to `/studio` route in your browser
2. Log in with your Sanity credentials
3. Manage artworks, comics, events, and shop items

## Deployment

The site is configured for deployment on Vercel:

```bash
npm run build
```

Push to your main branch and Vercel will automatically deploy.

## License

Private - All rights reserved
