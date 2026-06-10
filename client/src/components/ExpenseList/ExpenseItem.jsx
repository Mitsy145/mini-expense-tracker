import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/dateHelpers';

const CATEGORY_COLORS = {
  Food: 'bg-orange-100 text-orange-600',
  Transport: 'bg-blue-100 text-blue-600',
  Bills: 'bg-red-100 text-red-600',
  Entertainment: 'bg-purple-100 text-purple-600',
  Other: 'bg-gray-100 text-gray-600',
};

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this expense?\n"${expense.note || expense.category} — ${formatCurrency(expense.amount)}"`
    );
    if (confirmed) {
      onDelete(expense.id);
    }
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
      {/* Date */}
      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
        {formatDate(expense.date)}
      </td>

      {/* Category */}
      <td className="px-4 py-3">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other
          }`}
        >
          {expense.category}
        </span>
      </td>

      {/* Note */}
      <td className="px-4 py-3 text-sm text-gray-500">
        {expense.note || '—'}
      </td>

      {/* Amount */}
      <td className="px-4 py-3 text-sm font-semibold text-gray-800 whitespace-nowrap">
        {formatCurrency(expense.amount)}
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(expense)}
            className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-xs px-3 py-1 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ExpenseItem;