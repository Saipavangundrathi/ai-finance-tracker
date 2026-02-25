import { useState, useEffect } from 'react';

const CATEGORIES = [
  'Food',
  'Rent',
  'Transport',
  'Entertainment',
  'Health',
  'Shopping',
  'Utilities',
  'Other',
];

function formatDateForInput(dateValue) {
  if (!dateValue) return '';
  const date = new Date(dateValue);
  return date.toISOString().slice(0, 10);
}

export default function ExpenseForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title ?? '');
      setAmount(initialData.amount ?? '');
      setCategory(initialData.category ?? '');
      setDate(formatDateForInput(initialData.date) ?? '');
      setNote(initialData.note ?? '');
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Title is required');
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (!category) {
      setError('Please select a category');
      return;
    }
    if (!date) {
      setError('Date is required');
      return;
    }

    onSubmit({
      title: trimmedTitle,
      amount: numAmount,
      category,
      date,
      note: note.trim(),
    });
  }

  const inputBase =
    'w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-400 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500';

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-700/50 bg-gray-900 p-6 shadow-lg"
    >
      <h2 className="mb-6 text-xl font-semibold text-white">
        {initialData ? 'Edit Expense' : 'Add Expense'}
      </h2>

      {error && (
        <p className="mb-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-300">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Grocery shopping"
            className={inputBase}
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="mb-1.5 block text-sm font-medium text-gray-300">
            Amount <span className="text-red-400">*</span>
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className={inputBase}
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-gray-300">
            Category <span className="text-red-400">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${inputBase} cursor-pointer appearance-none`}
            required
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-gray-300">
            Date <span className="text-red-400">*</span>
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputBase}
            required
          />
        </div>

        <div>
          <label htmlFor="note" className="mb-1.5 block text-sm font-medium text-gray-300">
            Note
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional notes..."
            rows={3}
            className={`${inputBase} resize-none`}
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Save Expense
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-600 bg-gray-800 px-5 py-2.5 font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
