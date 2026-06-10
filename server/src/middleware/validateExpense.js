const { body, validationResult } = require('express-validator');

// Validation rules for adding/editing an expense
const expenseValidationRules = [
  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),

  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['Food', 'Transport', 'Bills', 'Entertainment', 'Other'])
    .withMessage('Category must be one of: Food, Transport, Bills, Entertainment, Other'),

  body('date')
    .notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Date must be a valid date')
    .custom((value) => {
      const inputDate = new Date(value);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // allow today
      if (inputDate > today) {
        throw new Error('Date cannot be in the future');
      }
      return true;
    }),

  body('note')
    .optional()
    .isString().withMessage('Note must be a string')
    .isLength({ max: 200 }).withMessage('Note must be under 200 characters'),
];

// Middleware to check validation result
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { expenseValidationRules, validate };