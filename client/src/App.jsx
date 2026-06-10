import { useState } from 'react';
import useExpenses from './hooks/useExpenses';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseList from './components/ExpenseList/ExpenseList';
import SummaryPanel from './components/Summary/SummaryPanel';
import CategoryChart from './components/Summary/CategoryChart';
import FilterBar from './components/shared/FilterBar';
import IncomeModal from './components/Summary/IncomeModal';

const App = () => {
  const {
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
  } = useExpenses();

  const [editingExpense, setEditingExpense] = useState(null);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  // When user clicks Edit on an expense
  const onEditClick = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When form is submitted
  const onFormSubmit = async (formData) => {
    if (editingExpense) {
      await handleEdit(editingExpense.id, formData);
      setEditingExpense(null);
    } else {
      await handleAdd(formData);
    }
  };

  // Cancel edit
  const onCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-blue-50">

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
               Mini Expense Tracker
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Track your daily spending
            </p>
          </div>

          {/* Quick Balance in Header */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="text-right">
              <p className="text-xs text-gray-400">Income</p>
              <p className="font-semibold text-gray-700">
                ₹{budget.income.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Spent</p>
              <p className="font-semibold text-red-500">
                ₹{budget.totalSpent.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Balance</p>
              <p className={`font-bold text-lg ${
                budget.balance < 0 ? 'text-red-500' : 'text-green-500'
              }`}>
                ₹{budget.balance.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">

        {/* Error Banner */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            ⚠️ {error}
          </div>
        )}

        {/* Income not set banner */}
        {budget.income === 0 && (
          <div
            onClick={() => setShowIncomeModal(true)}
            className="mb-4 px-4 py-3 bg-blue-50 border border-blue-200 text-blue-600 text-sm rounded-lg cursor-pointer hover:bg-blue-100 transition"
          >
            💡 You haven't set your income yet. Click here to set it and track your balance!
          </div>
        )}

        {/* Add / Edit Form */}
        <ExpenseForm
          onSubmit={onFormSubmit}
          editingExpense={editingExpense}
          onCancelEdit={onCancelEdit}
        />

        {/* Summary Cards */}
        <SummaryPanel
          summary={summary}
          budget={budget}
          onSetIncomeClick={() => setShowIncomeModal(true)}
        />

        {/* Category Chart */}
        {summary && summary.totalPerCategory && (
          <CategoryChart totalPerCategory={summary.totalPerCategory} />
        )}

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Expense List */}
        <ExpenseList
          expenses={expenses}
          onEdit={onEditClick}
          onDelete={handleDelete}
          loading={loading}
        />

      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400">
        Mini Expense Tracker — Built for Studio Graphene
      </footer>

      {/* Income Modal */}
      {showIncomeModal && (
        <IncomeModal
          currentIncome={budget.income}
          onSave={handleSetIncome}
          onClose={() => setShowIncomeModal(false)}
        />
      )}

    </div>
  );
};

export default App;