import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { availableBooks } from '../data/books';
import { useBookStore } from '../stores/bookStores';
import { Search } from 'lucide-react';

export const Route = createFileRoute('/browse')({
  component: BrowsePage,
});

function BrowsePage() {
  const vault = useBookStore((state) => state.vault);
  const addToVault = useBookStore((state) => state.addToVault);
  const [searchTerm, setSearchTerm] = useState('');

  const isInVault = (bookId: string) => vault.some((book) => book.id === bookId);

  const filteredBooks = availableBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
          Discover Your Next Read
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Browse our collection and add books to your personal vault.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
          />
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => {
          const added = isInVault(book.id);
          return (
            <div
              key={book.id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {added && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                    In Vault
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{book.title}</h3>
                <p className="text-gray-500 text-sm mb-3">by {book.author}</p>
                <button
                  onClick={() => addToVault(book)}
                  disabled={added}
                  className={`w-full py-2.5 rounded-xl font-medium transition-all ${added
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 shadow-md hover:shadow-lg'
                    }`}
                >
                  {added ? '✓ Already in Vault' : '+ Add to Vault'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No books match your search.</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-2 text-indigo-600 hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}