const { v4: uuidv4 } = require('uuid');
const { readExpenses, writeExpenses } = require('../utils/memoryStore');

// GET /api/expenses
const getExpenses = (req, res) => {
  try {
    let expenses = readExpenses();
    const { category, from, to } = req.query;

    if (category && category !== 'All') {
      expenses = expenses.filter((e) => e.category === category);
    }
    if (from) {
      expenses = expenses.filter((e) => new Date(e.date) >= new Date(from));
    }
    if (to) {
      expenses = expenses.filter((e) => new Date(e.date) <= new Date(to));
    }

    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

// POST /api/expenses
const addExpense = (req, res) => {
  try {
    const { amount, category, date, note } = req.body;

    const newExpense = {
      id: uuidv4(),
      amount: parseFloat(amount),
      category,
      date,
      note: note || '',
      createdAt: new Date().toISOString(),
    };

    const expenses = readExpenses();
    expenses.push(newExpense);
    writeExpenses(expenses);

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
};

// PUT /api/expenses/:id
const editExpense = (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, date, note } = req.body;

    const expenses = readExpenses();
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expenses[index] = {
      ...expenses[index],
      amount: parseFloat(amount),
      category,
      date,
      note: note || '',
      updatedAt: new Date().toISOString(),
    };

    writeExpenses(expenses);
    res.status(200).json(expenses[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
};

// DELETE /api/expenses/:id
const deleteExpense = (req, res) => {
  try {
    const { id } = req.params;
    const expenses = readExpenses();
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expenses.splice(index, 1);
    writeExpenses(expenses);

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};

// GET /api/expenses/summary
const getSummary = (req, res) => {
  try {
    const expenses = readExpenses();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonthExpenses = expenses.filter((e) => {
      const expDate = new Date(e.date);
      return (
        expDate.getMonth() === currentMonth &&
        expDate.getFullYear() === currentYear
      );
    });

    const totalThisMonth = thisMonthExpenses.reduce(
      (sum, e) => sum + e.amount, 0
    );

    const totalPerCategory = thisMonthExpenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});

    const highestExpense =
      expenses.length > 0
        ? expenses.reduce((max, e) => (e.amount > max.amount ? e : max))
        : null;

    res.status(200).json({
      totalThisMonth,
      totalPerCategory,
      highestExpense,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  editExpense,
  deleteExpense,
  getSummary,
};