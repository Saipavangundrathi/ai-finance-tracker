import ExpenseCard from './ExpenseCard.jsx';

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-gray-700/50 bg-gray-800/50 p-12 text-center">
        <span className="mb-3 text-5xl" aria-hidden="true">
          💸
        </span>
        <p className="text-lg text-gray-400">No expenses yet. Start by adding one!</p>
      </div>
    );
  }

  const totalAmount = expenses.reduce((sum, exp) => sum + (exp.amount ?? 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-700/50 bg-gray-800 px-5 py-4">
        <p className="text-sm font-medium text-gray-300">
          <span className="text-white">{expenses.length}</span>{' '}
          {expenses.length === 1 ? 'expense' : 'expenses'}
        </p>
        <p className="text-lg font-semibold text-emerald-400">
          Total: {formatCurrency(totalAmount)}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
