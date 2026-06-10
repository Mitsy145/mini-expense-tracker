import { useState } from 'react';

const IncomeModal = ({ currentIncome, onSave, onClose }) => {
  const [value, setValue] = useState(currentIncome || '');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!value || isNaN(value) || parseFloat(value) < 0) {
      setError('Please enter a valid positive amount');
      return;
    }
    onSave(parseFloat(value));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">

        <h2 className="text-lg font-bold text-gray-800 mb-1">
          💵 Set Your Income
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          Your balance will be calculated automatically based on expenses.
        </p>

        <label className="text-sm font-medium text-gray-600 mb-1 block">
          Monthly Income (₹)
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError('');
          }}
          placeholder="e.g. 50000"
          min="0"
          step="0.01"
          className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1 ${
            error ? 'border-red-400' : 'border-gray-200'
          }`}
        />
        {error && (
          <p className="text-xs text-red-500 mb-3">{error}</p>
        )}

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSave}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Save Income
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default IncomeModal;