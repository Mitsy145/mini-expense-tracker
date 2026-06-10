const { readBudget, writeBudget } = require('../utils/budgetStore');
const { readExpenses } = require('../utils/fileStore');

// GET /api/budget
const getBudget = (req, res) => {
  try {
    const budget = readBudget();
    const expenses = readExpenses();

    // Calculate total spent (all time)
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

    // Real time balance
    const balance = budget.income - totalSpent;

    res.status(200).json({
      income: budget.income,
      totalSpent,
      balance,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch budget' });
  }
};

// POST /api/budget
const setIncome = (req, res) => {
  try {
    const { income } = req.body;

    if (income === undefined || isNaN(income) || parseFloat(income) < 0) {
      return res.status(400).json({ error: 'Income must be a positive number' });
    }

    const budget = readBudget();
    budget.income = parseFloat(income);
    writeBudget(budget);

    // Recalculate balance
    const expenses = readExpenses();
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const balance = budget.income - totalSpent;

    res.status(200).json({
      income: budget.income,
      totalSpent,
      balance,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update income' });
  }
};

module.exports = { getBudget, setIncome };