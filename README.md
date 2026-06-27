# InvestSimple

> **Understand markets. Not just track them.**

InvestSimple is a full-stack educational fintech platform that helps beginners understand financial markets through real-time stock and cryptocurrency data combined with AI-generated explanations. Instead of simply displaying charts and technical indicators, InvestSimple translates complex market movements into beginner-friendly insights.

---

# Features

## Authentication

* JWT Authentication
* Secure Login & Registration
* Password Hashing using bcrypt
* Protected Routes

## Market Data

* Real-time Stock Market Data
* Cryptocurrency Market Data
* Market Trend Analysis
* Interactive Charts *(Frontend redesign in progress)*

## InvestSimple Analysis

Generates beginner-friendly explanations including:

* What happened?
* Why did it happen?
* What does it mean?
* Goal alignment
* Confidence score

Powered by Groq LLM.

## Performance

* Redis Caching
* Faster API Responses
* Reduced API Calls

## Real-Time Updates

* Socket.io Integration
* Live Financial Insights

## Database

* PostgreSQL
* User Authentication
* Transactions
* User Data

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Framer Motion

## Backend

* Node.js
* Express.js
* PostgreSQL
* Redis
* JWT
* Socket.io
* Groq SDK

## APIs

* Stock Market API
* Cryptocurrency API
* Groq AI API

---

# Project Structure

```text
InvestSimple
│
├── client/                 # React Frontend
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── sockets/
│   └── app.js
│
├── package.json
└── README.md
```

---

# Architecture

```text
React Frontend
        │
        ▼
Express Server
        │
 ├── JWT Authentication
 ├── Stock APIs
 ├── Crypto APIs
 ├── Groq AI
 ├── Redis Cache
 ├── Socket.io
        │
        ▼
PostgreSQL
```

---

# Current Functionality

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* AI-powered Market Analysis
* Redis Integration
* PostgreSQL Database
* Stock & Crypto API Integration
* Socket.io Real-time Communication

---

# Project Status

The backend architecture is feature-complete and powers authentication, AI analysis, market data integration, and real-time communication.

The frontend is currently being redesigned to provide a more polished educational investing experience while preserving the existing backend functionality.

---

# Future Improvements

* Portfolio Tracking
* Holdings Management
* Position Analysis
* Watchlist
* Goal Tracking
* Professional TradingView Charts
* Learning Hub
* Personalized Market Insights

---

# What I Learned

This project helped me gain practical experience with:

* Backend Architecture
* REST API Development
* JWT Authentication
* PostgreSQL Database Design
* Redis Caching
* Socket.io
* AI Integration
* Full-Stack Development
* FinTech System Design

---

# Disclaimer

InvestSimple is an educational platform designed to help users understand financial markets.

It does **not** provide personalized financial or investment advice.

---

# Author

**Sathvika Mahale**
