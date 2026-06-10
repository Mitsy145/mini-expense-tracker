## 1 Mini Expense Tracker

A full-stack web application built as part of the Studio Graphene Associate Software Engineer technical assessment (Exercise 2 — Mini Expense Tracker). The app allows a single user to log daily expenses across categories, set a monthly income, track real-time balance, filter spending 
by date and category, and visualise where their money is going through a summary panel and category chart. The backend is built with Node.js and Express, exposing a REST API, while the frontend is built with React and Vite.



## 2 Live Demo

| Layer | URL |
|---|---|
| **Frontend** | https://mini-expense-tracker-lyart-xi.vercel.app |
| **Backend API** | https://mini-expense-tracker-api-b32k.onrender.com |

> **Note:** The backend is hosted on Render's free tier and may take 50–60 seconds to wake up on the first request after a period of inactivity. Please wait and refresh if the app shows "Failed to load expenses" on first visit.

## Quick API Check
To verify the backend is running, open these URLs directly in your browser:

https://mini-expense-tracker-api-b32k.onrender.com/api/expenses
Should return []      ( Budget endpoint — should return income, total spent and balance. )

https://mini-expense-tracker-api-b32k.onrender.com/api/budget
{ "income": 0, "totalSpent": 0, "balance": 0 }    (If both return valid JSON responses, the backend is live and ready.)



## 3 Tech Stack

### Backend
| Tool | Why I Used It |
|---|---|
| **Node.js** | JavaScript runtime for the server — lightweight and fast for REST APIs |
| **Express.js** | Minimal and readable framework for defining routes and middleware |
| **uuid** | Generates unique IDs for each expense reliably |
| **express-validator** | Clean, readable input validation without cluttering controller logic |
| **cors** | Allows the frontend (different domain/port) to communicate with the backend |
| **dotenv** | Keeps environment variables like PORT out of the codebase |

### Frontend
| Tool | Why I Used It |
|---|---|
| **React** | Component-based UI — makes the app easy to reason about and maintain |
| **Vite** | Fast dev server and build tool — significantly faster than Create React App |
| **Axios** | Cleaner API calls with better error handling compared to raw fetch |
| **Recharts** | Simple and declarative chart library that integrates naturally with React |
| **Tailwind CSS** | Utility-first styling — keeps components clean without separate CSS files |
| **date-fns** | Lightweight date formatting and range calculation without heavy dependencies |

### Storage
| Tool | Why I Used It |
|---|---|
| **In-memory array** | Sufficient for a single-user demo app — no database setup required |

### Deployment
| Tool | Why I Used It |
|---|---|
| **Vercel** | Zero-config frontend deployment with automatic GitHub integration |
| **Render** | Free Node.js hosting with automatic deploys on every GitHub push |

### Testing
| Tool | Why I Used It |
|---|---|
| **Jest** | Simple and reliable test runner for Node.js |
| **Supertest** | Makes HTTP assertions clean and readable without starting a real server |



## 4  How to Run Locally

> **Prerequisites:** Only Node.js is required. Download it from [nodejs.org](https://nodejs.org) if you haven't already.



### Step 1 — Clone the Repository

```bash
git clone https://github.com/Mitsy145/mini-expense-tracker.git
cd mini-expense-tracker
```

### Step 2 — Setup & Run the Backend

```bash
cd server
npm install
npm run dev
```

The backend will start at:
http://localhost:5000

To verify it's running, open this in your browser:
http://localhost:5000/api/expenses

You should see `[]`



### Step 3 — Setup & Run the Frontend

Open a **new terminal** (keep the backend running in the first one):

```bash
cd client
npm install
npm run dev
```

The frontend will start at:
http://localhost:5173



### Step 4 — Open the App

Visit **http://localhost:5173** in your browser.

Both terminals must be running at the same time:

| Terminal | Command | URL |
|---|---|---|
| Terminal 1 (backend) | `npm run dev` inside `/server` | http://localhost:5000 |
| Terminal 2 (frontend) | `npm run dev` inside `/client` | http://localhost:5173 |



### Step 5 — Run Tests (Optional)

```bash
cd server
npm test
```

Expected output:
Test Suites: 1 passed
Tests:       8 passed


## 5 API Documentation

> Base URL (local): `http://localhost:5000`
> Base URL (deployed): `https://mini-expense-tracker-api-b32k.onrender.com`



### Expenses

#### GET `/api/expenses`
Fetch all expenses. Supports optional query filters.

**Query Parameters (all optional):**
| Parameter | Type | Example |
|---|---|---|
| `category` | string | `Food` |
| `from` | date string | `2026-06-01` |
| `to` | date string | `2026-06-30` |

**Response `200`:**
```json
[
  {
    "id": "uuid",
    "amount": 250,
    "category": "Food",
    "date": "2026-06-01",
    "note": "Lunch with team",
    "createdAt": "2026-06-01T10:00:00.000Z"
  }
]
```



#### POST `/api/expenses`
Add a new expense.

**Request Body:**
```json
{
  "amount": 250,
  "category": "Food",
  "date": "2026-06-01",
  "note": "Lunch with team"
}
```

**Validation Rules:**
| Field | Rule |
|---|---|
| `amount` | Required, must be a positive number |
| `category` | Required, must be one of: Food, Transport, Bills, Entertainment, Other |
| `date` | Required, cannot be a future date |
| `note` | Optional, max 200 characters |

**Response `201`:**
```json
{
  "id": "uuid",
  "amount": 250,
  "category": "Food",
  "date": "2026-06-01",
  "note": "Lunch with team",
  "createdAt": "2026-06-01T10:00:00.000Z"
}
```

**Response `400` (validation error):**
```json
{
  "errors": [
    {
      "msg": "Amount must be a positive number",
      "param": "amount"
    }
  ]
}
```



#### PUT `/api/expenses/:id`
Edit an existing expense by ID.

**Request Body:**
```json
{
  "amount": 300,
  "category": "Transport",
  "date": "2026-06-01",
  "note": "Cab to office"
}
```

**Response `200`:**
```json
{
  "id": "uuid",
  "amount": 300,
  "category": "Transport",
  "date": "2026-06-01",
  "note": "Cab to office",
  "updatedAt": "2026-06-01T12:00:00.000Z"
}
```

**Response `404`:**
```json
{
  "error": "Expense not found"
}
```



#### DELETE `/api/expenses/:id`
Delete an expense by ID.

**Response `200`:**
```json
{
  "message": "Expense deleted successfully"
}
```

**Response `404`:**
```json
{
  "error": "Expense not found"
}
```



#### GET `/api/expenses/summary`
Get spending summary for the current month.

**Response `200`:**
```json
{
  "totalThisMonth": 1500,
  "totalPerCategory": {
    "Food": 800,
    "Transport": 400,
    "Bills": 300
  },
  "highestExpense": {
    "id": "uuid",
    "amount": 800,
    "category": "Food",
    "date": "2026-06-01",
    "note": "Grocery shopping"
  }
}
```



### Budget

#### GET `/api/budget`
Get current income, total spent and real-time balance.

**Response `200`:**
```json
{
  "income": 50000,
  "totalSpent": 1500,
  "balance": 48500
}
```



#### POST `/api/budget`
Set or update monthly income.

**Request Body:**
```json
{
  "income": 50000
}
```

**Response `200`:**
```json
{
  "income": 50000,
  "totalSpent": 1500,
  "balance": 48500
}
```

**Response `400`:**
```json
{
  "error": "Income must be a positive number"
}
```



## 6 Project Structure

```
mini-expense-tracker/
│
├── README.md                         ← Project documentation
├── .gitignore                        ← Files excluded from Git
│
├── server/                           ← Node.js + Express backend
│   ├── package.json
│   ├── .env.example                  ← Environment variable template
│   │
│   ├── src/
│   │   ├── index.js                  ← Entry point, starts the server
│   │   ├── app.js                    ← Express setup, middleware, routes
│   │   │
│   │   ├── routes/
│   │   │   ├── expenses.js           ← Expense route definitions
│   │   │   └── budget.js             ← Budget route definitions
│   │   │
│   │   ├── controllers/
│   │   │   ├── expensesController.js ← Add, edit, delete, list, summary logic
│   │   │   └── budgetController.js   ← Get and set income logic
│   │   │
│   │   ├── middleware/
│   │   │   └── validateExpense.js    ← Input validation rules
│   │   │
│   │   └── utils/
│   │       └── memoryStore.js        ← In-memory storage for expenses and budget
│   │
│   └── tests/
│       └── expenses.test.js          ← API tests for expenses, budget and summary
│
└── client/                           ← React + Vite frontend
    ├── package.json
    ├── vite.config.js                ← Vite config with backend proxy
    ├── index.html
    ├── tailwind.config.js            ← Tailwind CSS configuration
    ├── .env.example                  ← Environment variable template
    │
    └── src/
        ├── main.jsx                  ← React entry point
        ├── App.jsx                   ← Root component and layout
        │
        ├── api/
        │   ├── expenses.js           ← All Axios calls for expenses
        │   └── budget.js             ← All Axios calls for budget
        │
        ├── components/
        │   ├── ExpenseForm/
        │   │   └── ExpenseForm.jsx   ← Add and edit expense form
        │   │
        │   ├── ExpenseList/
        │   │   ├── ExpenseList.jsx   ← Full expenses table with CSV export
        │   │   └── ExpenseItem.jsx   ← Single expense row with edit and delete
        │   │
        │   ├── Summary/
        │   │   ├── SummaryPanel.jsx  ← Income, balance and spending totals
        │   │   ├── CategoryChart.jsx ← Recharts pie chart by category
        │   │   └── IncomeModal.jsx   ← Modal to set monthly income
        │   │
        │   └── shared/
        │       ├── FilterBar.jsx     ← Category and date range filters
        │       └── EmptyState.jsx    ← Shown when no expenses found
        │
        ├── hooks/
        │   └── useExpenses.js        ← Custom hook managing all app state
        │
        └── utils/
            ├── formatCurrency.js     ← Formats numbers to ₹ Indian locale
            ├── dateHelpers.js        ← Date range and formatting helpers
            └── exportCSV.js          ← CSV download for visible expenses
```


## 7  Next Steps

### What I Chose Not to Do (and Why)

| Feature | Reason |
|---|---|
| **User Authentication** | Out of scope — assignment specifies single user assumption |
| **Database (PostgreSQL/SQLite)** | In-memory storage fully satisfies the assignment requirements |
| **Drag and drop reordering** | Prioritised core functionality and clean code over extras |
| **Budget per category** | Implemented a simpler but more useful income vs balance system instead |



### Known Limitations

| Limitation | Detail |
|---|---|
| **In-memory storage** | Data resets when the server restarts on Render's free tier |
| **Shared data** | Since there is no authentication, all users share the same server memory in the deployed version |
| **Render cold start** | Free tier backend sleeps after inactivity — first request may take 50–60 seconds |



### What I Would Build Next With More Time

| Improvement | Detail |
|---|---|
| **Persistent storage** | Migrate to SQLite or PostgreSQL so data survives server restarts |
| **User authentication** | Add JWT-based auth so each user has their own private data |
| **Budget per category** | Allow users to set spending limits per category with visual warnings |
| **Recurring expenses** | Mark expenses as recurring (monthly bills, subscriptions) |
| **Monthly comparison** | Chart comparing spending across multiple months |
| **Mobile responsiveness** | Further polish the UI for smaller screen sizes |
| **More test coverage** | Add frontend tests using React Testing Library |
| **Dark mode** | Toggle between light and dark theme |





                                                         THANK YOU FOR YOU TIME!                                                                                           