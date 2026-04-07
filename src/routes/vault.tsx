import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useBookStore } from '../stores/bookStores';

export const Route = createFileRoute('/vault')({
  component: VaultPage,
});

function VaultPage() {
  const vault = useBookStore((state) => state.vault);
  const removeFromVault = useBookStore((state) => state.removeFromVault);
  const toggleRead = useBookStore((state) => state.toggleRead);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'author' | 'readStatus'>('title');

  // Filter and sort books
  let filteredBooks = vault.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy === 'title') {
    filteredBooks = [...filteredBooks].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'author') {
    filteredBooks = [...filteredBooks].sort((a, b) => a.author.localeCompare(b.author));
  } else if (sortBy === 'readStatus') {
    filteredBooks = [...filteredBooks].sort((a, b) => Number(a.isRead) - Number(b.isRead));
  }

  if (vault.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📭</div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your vault is empty</h2>
        <p className="text-gray-500 mb-6">You haven't added any books to your collection yet.</p>
        <a
          href="/browse"
          className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
        >
          Browse Books →
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
          My Book Vault
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          You have {vault.length} book{vault.length !== 1 ? 's' : ''} in your collection.
        </p>
      </div>

      {/* Controls: Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl shadow-sm bg-white focus:ring-2 focus:ring-indigo-400"
          >
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author</option>
            <option value="readStatus">Sort by Read Status</option>
          </select>
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No books match your search.</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-2 text-indigo-600 hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
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
                <div className="absolute top-2 right-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold shadow ${book.isRead
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 text-white'
                      }`}
                  >
                    {book.isRead ? 'Read' : 'Unread'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{book.title}</h3>
                <p className="text-gray-500 text-sm mb-3">by {book.author}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleRead(book.id)}
                    className={`flex-1 py-2 rounded-xl font-medium transition-all ${book.isRead
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                  >
                    {book.isRead ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button
                    onClick={() => removeFromVault(book.id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}