import { getThisMonthRange, getLastMonthRange } from '../../utils/dateHelpers';

const CATEGORIES = ['All', 'Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

const FilterBar = ({ filters, onFilterChange }) => {

  const handleQuickDate = (type) => {
    if (type === 'this_month') {
      const range = getThisMonthRange();
      onFilterChange({ from: range.from, to: range.to });
    } else if (type === 'last_month') {
      const range = getLastMonthRange();
      onFilterChange({ from: range.from, to: range.to });
    } else {
      onFilterChange({ from: '', to: '' });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-end">

        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* From Date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            From
          </label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => onFilterChange({ from: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            To
          </label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => onFilterChange({ to: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Quick Date Buttons */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Quick Select
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleQuickDate('this_month')}
              className="px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
            >
              This Month
            </button>
            <button
              onClick={() => handleQuickDate('last_month')}
              className="px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
            >
              Last Month
            </button>
            <button
              onClick={() => handleQuickDate('all')}
              className="px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition"
            >
              All Time
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterBar;