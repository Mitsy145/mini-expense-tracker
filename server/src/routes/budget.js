const express = require('express');
const router = express.Router();
const { getBudget, setIncome } = require('../controllers/budgetController');

router.get('/', getBudget);
router.post('/', setIncome);

module.exports = router;