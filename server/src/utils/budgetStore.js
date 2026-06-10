const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/budget.json');

const readBudget = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { income: 0 };
  }
};

const writeBudget = (budget) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(budget, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing budget file:', error.message);
  }
};

module.exports = { readBudget, writeBudget };