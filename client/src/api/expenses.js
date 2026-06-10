import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL || ''}/api/expenses`;

// Get all expenses with optional filters
export const getAllExpenses = async (filters = {}) => {
  const { category, from, to } = filters;
  const params = {};
  if (category && category !== 'All') params.category = category;
  if (from) params.from = from;
  if (to) params.to = to;

  const response = await axios.get(BASE_URL, { params });
  return response.data;
};

// Add a new expense
export const addExpense = async (expenseData) => {
  const response = await axios.post(BASE_URL, expenseData);
  return response.data;
};

// Edit an existing expense
export const editExpense = async (id, expenseData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, expenseData);
  return response.data;
};

// Delete an expense
export const deleteExpense = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

// Get summary
export const getSummary = async () => {
  const response = await axios.get(`${BASE_URL}/summary`);
  return response.data;
};