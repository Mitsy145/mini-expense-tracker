const request = require('supertest');
const app = require('../src/app');

// Test Suite 1 — Expense Endpoints
describe('Expense API', () => {

  // Test 1 — GET /api/expenses returns empty array initially
  it('should return an empty array when no expenses exist', async () => {
    const res = await request(app).get('/api/expenses');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test 2 — POST /api/expenses adds a new expense
  it('should add a new expense successfully', async () => {
    const newExpense = {
      amount: 250,
      category: 'Food',
      date: '2026-06-01',
      note: 'Lunch',
    };

    const res = await request(app)
      .post('/api/expenses')
      .send(newExpense);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.amount).toBe(250);
    expect(res.body.category).toBe('Food');
    expect(res.body.note).toBe('Lunch');
  });

  // Test 3 — POST /api/expenses rejects negative amount
  it('should reject an expense with a negative amount', async () => {
    const badExpense = {
      amount: -100,
      category: 'Food',
      date: '2026-06-01',
    };

    const res = await request(app)
      .post('/api/expenses')
      .send(badExpense);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

  // Test 4 — POST /api/expenses rejects missing category
  it('should reject an expense with no category', async () => {
    const badExpense = {
      amount: 100,
      date: '2026-06-01',
    };

    const res = await request(app)
      .post('/api/expenses')
      .send(badExpense);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

});

// Test Suite 2 — Budget Endpoint
describe('Budget API', () => {

  // Test 5 — GET /api/budget returns initial budget
  it('should return initial budget with zero values', async () => {
    const res = await request(app).get('/api/budget');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('income');
    expect(res.body).toHaveProperty('totalSpent');
    expect(res.body).toHaveProperty('balance');
  });

  // Test 6 — POST /api/budget sets income correctly
  it('should set income and return updated balance', async () => {
    const res = await request(app)
      .post('/api/budget')
      .send({ income: 50000 });

    expect(res.statusCode).toBe(200);
    expect(res.body.income).toBe(50000);
    expect(res.body).toHaveProperty('balance');
  });

  // Test 7 — POST /api/budget rejects negative income
  it('should reject negative income', async () => {
    const res = await request(app)
      .post('/api/budget')
      .send({ income: -5000 });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

});

// Test Suite 3 — Summary Endpoint
describe('Summary API', () => {

  // Test 8 — GET /api/expenses/summary returns correct shape
  it('should return summary with correct structure', async () => {
    const res = await request(app).get('/api/expenses/summary');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('totalThisMonth');
    expect(res.body).toHaveProperty('totalPerCategory');
    expect(res.body).toHaveProperty('highestExpense');
  });

});