const express = require('express');
const router = express.Router();
const {
  getExpenses,
  addExpense,
  editExpense,
  deleteExpense,
  getSummary,
} = require('../controllers/expensesController');
const {
  expenseValidationRules,
  validate,
} = require('../middleware/validateExpense');

// Summary route must come BEFORE /:id routes
// otherwise Express will treat "summary" as an id
router.get('/summary', getSummary);

router.get('/', getExpenses);
router.post('/', expenseValidationRules, validate, addExpense);
router.put('/:id', expenseValidationRules, validate, editExpense);
router.delete('/:id', deleteExpense);

module.exports = router;