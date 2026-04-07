import { createFileRoute } from '@tanstack/react-router';
import { useBookStore } from '../stores/bookStores';

export const Route = createFileRoute('/vault')({
  component: VaultPage,
});

function VaultPage() {
  const vault = useBookStore((state) => state.vault);
  const removeFromVault = useBookStore((state) => state.removeFromVault);
  const toggleRead = useBookStore((state) => state.toggleRead);

  if (vault.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📭</div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your vault is empty</h2>
        <p className="text-gray-500 mb-6">You haven't added any books to your collection yet.</p>
        <a
          href="/browse"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Browse Books →
        </a>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Book Vault</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vault.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-3">by {book.author}</p>

              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-medium px-2 py-1 rounded ${book.isRead
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {book.isRead ? '✓ Read' : '📖 Unread'}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleRead(book.id)}
                  className={`flex-1 py-2 px-3 rounded-md font-medium transition-colors ${book.isRead
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                >
                  {book.isRead ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button
                  onClick={() => removeFromVault(book.id)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
