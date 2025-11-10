'use client'

/**
 * 🔒 SECURE STUDIO PAGE
 * This page requires Sanity authentication to access.
 * Only users with proper permissions can edit content.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

// 🔒 Security: Configure the studio with authentication
const studioConfig = {
  ...config,
  basePath: '/studio',
  
  // Additional security options
  auth: {
    ...config.auth,
    // Redirect after login
    loginMethod: 'dual', // Support both popup and redirect
  }
}

export default function StudioPage() {
  return (
    <div style={{ height: '100vh' }}>
      <NextStudio 
        config={studioConfig}
        // 🔒 Security: Studio will handle authentication automatically
      />
    </div>
  )
}

// 🔒 Security: Disable static generation (force authentication on every request)
export const dynamic = 'force-dynamic'