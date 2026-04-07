import { createRootRoute, Outlet, Link } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              <span className="text-3xl">📚</span>
              <span className="hidden sm:inline">Personal Book Vault</span>
              <span className="sm:hidden">Book Vault</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex gap-1 sm:gap-2">
              <Link
                to="/"
                className="px-3 py-2 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 font-medium transition-all duration-200"
                activeProps={{ className: 'text-indigo-600 bg-indigo-50' }}
              >
                Home
              </Link>
              <Link
                to="/browse"
                className="px-3 py-2 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 font-medium transition-all duration-200"
                activeProps={{ className: 'text-indigo-600 bg-indigo-50' }}
              >
                Browse
              </Link>
              <Link
                to="/vault"
                className="px-3 py-2 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 font-medium transition-all duration-200"
                activeProps={{ className: 'text-indigo-600 bg-indigo-50' }}
              >
                My Vault
              </Link>
            </div>
          </div>
        </div>
      </nav>


      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        <Outlet />
      </main>
    </div>
  ),
});