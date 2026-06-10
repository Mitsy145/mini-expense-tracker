const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/expenses.json');

// Read all expenses from JSON file
const readExpenses = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    return [];
  }
};

// Write expenses array back to JSON file
const writeExpenses = (expenses) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to file:', error.message);
  }
};

module.exports = { readExpenses, writeExpenses };