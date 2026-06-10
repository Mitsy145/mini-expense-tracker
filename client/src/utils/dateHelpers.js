import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';

// Format a date string to display format → "12 Jun 2026"
export const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd MMM yyyy');
};

// Get today's date in YYYY-MM-DD format (for input max value)
export const getTodayString = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

// Get this month's date range
export const getThisMonthRange = () => {
  const now = new Date();
  return {
    from: format(startOfMonth(now), 'yyyy-MM-dd'),
    to: format(endOfMonth(now), 'yyyy-MM-dd'),
  };
};

// Get last month's date range
export const getLastMonthRange = () => {
  const lastMonth = subMonths(new Date(), 1);
  return {
    from: format(startOfMonth(lastMonth), 'yyyy-MM-dd'),
    to: format(endOfMonth(lastMonth), 'yyyy-MM-dd'),
  };
};