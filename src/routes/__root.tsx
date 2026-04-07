import { createRootRoute, Outlet, Link } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-indigo-600">📚 Personal Book Vault</h1>
            <div className="space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 font-medium"
                activeProps={{ className: 'text-indigo-600 border-b-2 border-indigo-600' }}
              >
                Home
              </Link>
              <Link
                to="/browse"
                className="text-gray-700 hover:text-indigo-600 font-medium"
                activeProps={{ className: 'text-indigo-600 border-b-2 border-indigo-600' }}
              >
                Browse
              </Link>
              <Link
                to="/vault"
                className="text-gray-700 hover:text-indigo-600 font-medium"
                activeProps={{ className: 'text-indigo-600 border-b-2 border-indigo-600' }}
              >
                My Vault
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  ),
});