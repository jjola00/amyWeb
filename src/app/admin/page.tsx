import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content Management - Beetlehead Designs',
  description: 'Secure access to content management system',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-800">
        <div className="text-center">
          {/* Logo/Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Content Management</h1>
          <p className="text-gray-300 mb-8">
            Access your studio to manage artworks, update your about page, and organize your portfolio.
          </p>
          
          {/* Studio Access Button */}
          <a 
            href="https://beetlehead-designs.sanity.studio" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center gap-3 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 mb-6 w-full justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open Content Studio
          </a>
          
          <div className="text-sm text-gray-400 space-y-2">
            <div className="flex items-center gap-2 justify-center">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Secure access with your Sanity account</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Only authorized users can edit content</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-white font-semibold mb-4">What you can do:</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-purple-400 font-semibold">🎨 Artworks</div>
                <div className="text-gray-400">Upload & organize</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-purple-400 font-semibold">📝 About Page</div>
                <div className="text-gray-400">Update bio & info</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-purple-400 font-semibold">🏷️ Categories</div>
                <div className="text-gray-400">Manage art types</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-purple-400 font-semibold">📱 Live Updates</div>
                <div className="text-gray-400">Instant publishing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}