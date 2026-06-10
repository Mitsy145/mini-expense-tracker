import { useState, useEffect, useCallback } from 'react';
import {
  getAllExpenses,
  addExpense,
  editExpense,
  deleteExpense,
  getSummary,
} from '../api/expenses';
import { getBudget, setIncome } from '../api/budget';

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [budget, setBudget] = useState({
    income: 0,
    totalSpent: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All',
    from: '',
    to: '',
  });

  // Fetch budget (income + balance)
  const fetchBudget = useCallback(async () => {
    try {
      const data = await getBudget();
      setBudget(data);
    } catch (err) {
      console.error('Failed to fetch budget:', err.message);
    }
  }, []);

  // Fetch expenses
  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllExpenses(filters);
      setExpenses(data);
    } catch (err) {
      setError('Failed to load expenses. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch summary
  const fetchSummary = useCallback(async () => {
    try {
      const data = await getSummary();
      setSummary(data);
    } catch (err) {
      console.error('Failed to fetch summary:', err.message);
    }
  }, []);

  // Fetch everything together
  const fetchAll = useCallback(async () => {
    await Promise.all([fetchExpenses(), fetchSummary(), fetchBudget()]);
  }, [fetchExpenses, fetchSummary, fetchBudget]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Add expense
  const handleAdd = async (expenseData) => {
    setLoading(true);
    try {
      await addExpense(expenseData);
      await fetchAll();
    } catch (err) {
      setError('Failed to add expense.');
    } finally {
      setLoading(false);
    }
  };

  // Edit expense
  const handleEdit = async (id, expenseData) => {
    setLoading(true);
    try {
      await editExpense(id, expenseData);
      await fetchAll();
    } catch (err) {
      setError('Failed to update expense.');
    } finally {
      setLoading(false);
    }
  };

  // Delete expense — deleted amount auto adds back to balance
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteExpense(id);
      await fetchAll();
    } catch (err) {
      setError('Failed to delete expense.');
    } finally {
      setLoading(false);
    }
  };

  // Update income
  const handleSetIncome = async (income) => {
    try {
      const data = await setIncome(income);
      setBudget(data);
    } catch (err) {
      setError('Failed to update income.');
    }
  };

  // Update filters
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return {
    expenses,
    summary,
    budget,
    loading,
    error,
    filters,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSetIncome,
    handleFilterChange,
  };
};

export default useExpenses;