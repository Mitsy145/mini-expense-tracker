const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <div className="text-6xl mb-4">💸</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-500">No expenses found</h3>
      <p className="text-sm text-center">
        No expenses match your current filters. <br />
        Try adjusting the filters or add a new expense.
      </p>
    </div>
  );
};

export default EmptyState;