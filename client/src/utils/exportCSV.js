// Convert expenses array to CSV and trigger download
export const exportToCSV = (expenses) => {
  if (expenses.length === 0) {
    alert('No expenses to export!');
    return;
  }

  // CSV Headers
  const headers = ['Date', 'Category', 'Amount (₹)', 'Note'];

  // CSV Rows
  const rows = expenses.map((e) => [
    e.date,
    e.category,
    e.amount.toFixed(2),
    e.note ? `"${e.note.replace(/"/g, '""')}"` : '',
  ]);

  // Combine headers + rows
  const csvContent = [headers, ...rows]
    .map((row) => row.join(','))
    .join('\n');

  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  // File name includes today's date
  const today = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `expenses_${today}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};