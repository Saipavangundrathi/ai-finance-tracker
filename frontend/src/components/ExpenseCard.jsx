const CATEGORY_COLORS = {
  Food: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Rent: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  Transport: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Entertainment: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Health: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Shopping: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  Utilities: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  Other: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function formatDate(dateValue) {
  if (!dateValue) return '';
  const date = new Date(dateValue);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ExpenseCard({ expense, onEdit, onDelete }) {
  const { id, title, amount, category, date, note } = expense;
  const badgeStyle = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Other;

  return (
    <article
      className="rounded-xl border border-gray-700/50 bg-gray-800 p-5 shadow-md transition duration-200 hover:border-gray-600 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="shrink-0 text-xl font-bold text-emerald-400">
          {formatCurrency(amount)}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${badgeStyle}`}
        >
          {category}
        </span>
        <span className="text-sm text-gray-400">{formatDate(date)}</span>
      </div>

      {note && (
        <p className="mt-3 text-sm text-gray-500 line-clamp-2">{note}</p>
      )}

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(expense)}
          className="rounded-lg bg-blue-600/20 px-3 py-1.5 text-sm font-medium text-blue-400 transition hover:bg-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="rounded-lg bg-red-600/20 px-3 py-1.5 text-sm font-medium text-red-400 transition hover:bg-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
