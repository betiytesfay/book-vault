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
  const progressPercent = totalBooks === 0 ? 0 : (readBooks / totalBooks) * 100;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
          Your Reading Journey
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Track your progress, discover new books, and build your personal vault.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Books</p>
              <p className="text-4xl font-bold text-gray-800 mt-1">{totalBooks}</p>
            </div>
            <div className="bg-indigo-100 rounded-full p-3 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📚</span>
            </div>
          </div>
        </div>

        <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Books Read</p>
              <p className="text-4xl font-bold text-green-600 mt-1">{readBooks}</p>
            </div>
            <div className="bg-green-100 rounded-full p-3 group-hover:scale-110 transition-transform">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Still Unread</p>
              <p className="text-4xl font-bold text-yellow-600 mt-1">{unreadBooks}</p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📖</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      {totalBooks > 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📈</span> Reading Progress
          </h3>
          <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-500">{readBooks} completed</span>
            <span className="text-sm font-semibold text-indigo-600">{Math.round(progressPercent)}%</span>
            <span className="text-sm text-gray-500">{unreadBooks} remaining</span>
          </div>
          {progressPercent === 100 && totalBooks > 0 && (
            <div className="mt-4 text-center text-green-600 font-medium flex items-center justify-center gap-2">
              🎉 Amazing! You've read all books in your vault. Time to add more!
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100">
          <div className="text-5xl mb-3">📭</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your vault is empty</h3>
          <p className="text-gray-500 mb-4">Start your reading journey by adding books from the Browse page.</p>
          <a
            href="/browse"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all"
          >
            Browse Books →
          </a>
        </div>
      )}
    </div>
  );
}