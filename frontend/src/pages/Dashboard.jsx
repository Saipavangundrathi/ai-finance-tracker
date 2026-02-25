import { useState, useEffect } from 'react';
import { getAllExpenses, createExpense, updateExpense, deleteExpense } from '../api/expenseApi.js';
import Navbar from '../components/Navbar.jsx';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import AIAnalysis from '../components/AIAnalysis.jsx';

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchExpenses() {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getAllExpenses();
      setExpenses(data ?? []);
    } catch (err) {
      setError(err.response?.data?.message ?? err.message ?? 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  function handleAddExpense() {
    setEditingExpense(null);
    setShowForm(true);
  }

  function handleEdit(expense) {
    setEditingExpense(expense);
    setShowForm(true);
  }

  async function handleDelete(id) {
    setError(null);
    try {
      await deleteExpense(id);
      await fetchExpenses();
    } catch (err) {
      setError(err.response?.data?.message ?? err.message ?? 'Failed to delete expense');
    }
  }

  async function handleFormSubmit(formData) {
    setError(null);
    try {
      if (editingExpense) {
        await updateExpense(editingExpense.id, formData);
      } else {
        await createExpense(formData);
      }
      await fetchExpenses();
      setShowForm(false);
      setEditingExpense(null);
    } catch (err) {
      setError(err.response?.data?.message ?? err.message ?? 'Failed to save expense');
    }
  }

  function handleFormCancel() {
    setShowForm(false);
    setEditingExpense(null);
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar onClick={handleAddExpense} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={() => setShowAI(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Analyze with AI 🤖
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div
                className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"
                aria-hidden="true"
              />
              <p className="text-sm text-gray-400">Loading expenses...</p>
            </div>
          </div>
        ) : (
          <ExpenseList
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="expense-form-title"
        >
          <div className="w-full max-w-md">
            <ExpenseForm
              onSubmit={handleFormSubmit}
              initialData={editingExpense}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}

      {showAI && <AIAnalysis onClose={() => setShowAI(false)} />}
    </div>
  );
}
