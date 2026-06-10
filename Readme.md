# 1 Mini Expense Tracker

A full-stack web application built as part of the Studio Graphene Associate Software Engineer technical assessment (Exercise 2 — Mini Expense Tracker). The app allows a single user to log daily expenses across categories, set a monthly income, track real-time balance, filter spending 
by date and category, and visualise where their money is going through a summary panel and category chart. The backend is built with Node.js and Express, exposing a REST API, while the frontend is built with React and Vite.

## ########################################################################################################################################################################### ##

## 2 Live Demo

| Layer | URL |
|---|---|
| **Frontend** | https://mini-expense-tracker-lyart-xi.vercel.app |
| **Backend API** | https://mini-expense-tracker-api-b32k.onrender.com |

> **Note:** The backend is hosted on Render's free tier and may take 50–60 seconds to wake up on the first request after a period of inactivity. Please wait and refresh if the app shows "Failed to load expenses" on first visit.

### Quick API Check
To verify the backend is running, open these URLs directly in your browser:

https://mini-expense-tracker-api-b32k.onrender.com/api/expenses
Should return []      ( Budget endpoint — should return income, total spent and balance. )

https://mini-expense-tracker-api-b32k.onrender.com/api/budget
{ "income": 0, "totalSpent": 0, "balance": 0 }    (If both return valid JSON responses, the backend is live and ready.)

