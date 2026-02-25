import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export function getAllExpenses() {
  return api.get('/expenses');
}

export function getExpenseById(id) {
  return api.get(`/expenses/${id}`);
}

export function createExpense(expenseData) {
  return api.post('/expenses', expenseData);
}

export function updateExpense(id, expenseData) {
  return api.put(`/expenses/${id}`, expenseData);
}

export function deleteExpense(id) {
  return api.delete(`/expenses/${id}`);
}

export function getExpensesByCategory(category) {
  return api.get(`/expenses/category/${category}`);
}

export function getExpensesByDateRange(startDate, endDate) {
  return api.get('/expenses/range', {
    params: { startDate, endDate },
  });
}

export function analyzeExpenses() {
  return api.post('/ai/analyze').then(res => res.data);
}
