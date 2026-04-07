import { createFileRoute } from '@tanstack/react-router';
import { availableBooks } from '../data/books';
import { useBookStore } from '../stores/bookStores';

export const Route = createFileRoute('/browse')({
  component: BrowsePage,
});

function BrowsePage() {
  const vault = useBookStore((state) => state.vault);
  const addToVault = useBookStore((state) => state.addToVault);

  const isInVault = (bookId: string) => vault.some((book) => book.id === bookId);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Browse Available Books</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableBooks.map((book) => {
          const added = isInVault(book.id);

          return (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-3">by {book.author}</p>
                <button
                  onClick={() => addToVault(book)}
                  disabled={added}
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${added
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                >
                  {added ? '✓ Already Added' : '+ Add '}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
