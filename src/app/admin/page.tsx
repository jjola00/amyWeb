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
            The admin page. If you are not Beetlehead TURN BACK AT ONCE.
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
        </div>
      </div>
    </div>
  )
}