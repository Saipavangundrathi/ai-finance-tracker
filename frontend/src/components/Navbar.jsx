export default function Navbar({ onClick }) {
  return (
    <nav className="bg-gray-900 border-b border-gray-700/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">
              💰
            </span>
            <span className="text-lg font-semibold text-white">
              AI Finance Tracker
            </span>
          </div>
          <button
            type="button"
            onClick={onClick}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 active:bg-emerald-700"
          >
            Add Expense
          </button>
        </div>
      </div>
    </nav>
  );
}
