// In-memory storage — acceptable per assignment requirements
// Data persists as long as server is running

let expenses = [];
let budget = { income: 0 };

// Expense operations
const readExpenses = () => expenses;

const writeExpenses = (data) => {
  expenses = data;
};

// Budget operations
const readBudget = () => budget;

const writeBudget = (data) => {
  budget = data;
};

module.exports = {
  readExpenses,
  writeExpenses,
  readBudget,
  writeBudget,
};