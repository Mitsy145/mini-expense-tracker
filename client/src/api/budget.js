import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL || ''}/api/budget`;

// Get current income, totalSpent, balance
export const getBudget = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Set income
export const setIncome = async (income) => {
  const response = await axios.post(BASE_URL, { income });
  return response.data;
};