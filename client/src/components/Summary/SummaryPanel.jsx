import { formatCurrency } from '../../utils/formatCurrency';

const CATEGORY_ICONS = {
  Food: '🍔',
  Transport: '🚗',
  Bills: '📄',
  Entertainment: '🎬',
  Other: '📦',
};

const SummaryPanel = ({ summary, budget, onSetIncomeClick }) => {
  if (!summary) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 text-center text-gray-400 text-sm">
        Loading summary...
      </div>
    );
  }

  const { totalThisMonth, totalPerCategory, highestExpense } = summary;
  const { income, totalSpent, balance } = budget;

  const balanceColor =
    balance < 0
      ? 'text-red-500'
      : balance < income * 0.2
      ? 'text-yellow-500'
      : 'text-green-500';

  return (
    <div className="mb-6 space-y-4">

      {/* Income / Balance Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Income */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Monthly Income
            </p>
            <button
              onClick={onSetIncomeClick}
              className="text-xs text-blue-500 hover:text-blue-700 underline"
            >
              {income === 0 ? 'Set Income' : 'Edit'}
            </button>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(income)}
          </p>
        </div>

        {/* Total Spent */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            Total Spent (All Time)
          </p>
          <p className="text-2xl font-bold text-red-500">
            {formatCurrency(totalSpent)}
          </p>
        </div>

        {/* Balance */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            Current Balance
          </p>
          <p className={`text-2xl font-bold ${balanceColor}`}>
            {formatCurrency(balance)}
          </p>
          {balance < 0 && (
            <p className="text-xs text-red-400 mt-1">
              ⚠️ You have exceeded your income!
            </p>
          )}
          {balance >= 0 && balance < income * 0.2 && income > 0 && (
            <p className="text-xs text-yellow-500 mt-1">
              ⚠️ Less than 20% balance remaining
            </p>
          )}
        </div>

      </div>

      {/* This Month + Category + Highest Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Total This Month */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            Total This Month
          </p>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(totalThisMonth)}
          </p>
        </div>

        {/* Per Category */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
            By Category (This Month)
          </p>
          {Object.keys(totalPerCategory).length === 0 ? (
            <p className="text-sm text-gray-400">No expenses this month</p>
          ) : (
            <ul className="space-y-1">
              {Object.entries(totalPerCategory).map(([cat, amount]) => (
                <li key={cat} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {CATEGORY_ICONS[cat] || '📦'} {cat}
                  </span>
                  <span className="font-medium text-gray-800">
                    {formatCurrency(amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Highest Expense */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            Highest Single Expense
          </p>
          {highestExpense ? (
            <>
              <p className="text-2xl font-bold text-red-500">
                {formatCurrency(highestExpense.amount)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {highestExpense.category} —{' '}
                {highestExpense.note || 'No note'}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-400">No expenses yet</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default SummaryPanel;