import { createFileRoute } from '@tanstack/react-router';
import { useBookStore } from '../stores/bookStores';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const vault = useBookStore((state) => state.vault);

  const totalBooks = vault.length;
  const readBooks = vault.filter((book) => book.isRead).length;
  const unreadBooks = totalBooks - readBooks;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Books</p>
              <p className="text-3xl font-bold text-gray-800">{totalBooks}</p>
            </div>
            <span className="text-3xl">📚</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Books Read</p>
              <p className="text-3xl font-bold text-green-600">{readBooks}</p>
            </div>
            <span className="text-3xl">✅</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Books Unread</p>
              <p className="text-3xl font-bold text-yellow-600">{unreadBooks}</p>
            </div>
            <span className="text-3xl">📖</span>
          </div>
        </div>
      </div>

      {totalBooks > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Reading Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-indigo-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${(readBooks / totalBooks) * 100}%` }}
            />
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            {readBooks} out of {totalBooks} books completed ({Math.round((readBooks / totalBooks) * 100)}%)
          </p>
        </div>
      )}
    </div>
  );
}
