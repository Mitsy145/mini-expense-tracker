import { useState, useEffect } from 'react';
import { getTodayString } from '../../utils/dateHelpers';

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

const EMPTY_FORM = {
  amount: '',
  category: 'Food',
  date: getTodayString(),
  note: '',
};

const ExpenseForm = ({ onSubmit, editingExpense, onCancelEdit }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // If editing, populate form with existing expense data
  useEffect(() => {
    if (editingExpense) {
      setForm({
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
        note: editingExpense.note || '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingExpense]);

  const validate = () => {
    const newErrors = {};
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    if (!form.category) {
      newErrors.category = 'Category is required';
    }
    if (!form.date) {
      newErrors.date = 'Date is required';
    }
    if (form.date > getTodayString()) {
      newErrors.date = 'Date cannot be in the future';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await onSubmit(form);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {editingExpense ? '✏️ Edit Expense' : '➕ Add New Expense'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Amount */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g. 250"
              min="0.01"
              step="0.01"
              className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.amount ? 'border-red-400' : 'border-gray-200'
              }`}
            />
            {errors.amount && (
              <span className="text-xs text-red-500">{errors.amount}</span>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? 'border-red-400' : 'border-gray-200'
              }`}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <span className="text-xs text-red-500">{errors.category}</span>
            )}
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              max={getTodayString()}
              className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.date ? 'border-red-400' : 'border-gray-200'
              }`}
            />
            {errors.date && (
              <span className="text-xs text-red-500">{errors.date}</span>
            )}
          </div>

          {/* Note */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Note (optional)
            </label>
            <input
              type="text"
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="e.g. Lunch with team"
              maxLength={200}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
          {editingExpense && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-5 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;