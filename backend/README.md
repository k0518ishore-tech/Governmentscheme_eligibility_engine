# SchemeGuide Backend — Government Scheme Eligibility Engine API

Production-ready, RESTful API built with **Node.js**, **Express**, and **MongoDB (Mongoose)** to power the SchemeGuide Government Scheme Eligibility Engine frontend.

---

## 📋 Table of Contents
1. [Architecture & Features](#architecture--features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites & Installation](#prerequisites--installation)
4. [Environment Variables](#environment-variables)
5. [Database Seeding](#database-seeding)
6. [Running the Server](#running-the-server)
7. [API Documentation](#api-documentation)
8. [Eligibility Engine Overview](#eligibility-engine-overview)
9. [Security Features](#security-features)

---

## 🏗️ Architecture & Features

- **Modular Architecture**: Clean separation into Controllers, Services, Models, Routes, Validators, and Middleware.
- **Dynamic Eligibility Engine**: Scheme eligibility rules are stored dynamically in MongoDB collections (not hard-coded) and evaluated server-side against citizen profile criteria.
- **RESTful Standards**: Standardized JSON responses (`success`, `message`, `data`, `error`), HTTP status codes, and input validation.
- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing (10 salt rounds). Passwords are never returned in queries (`select: false`).
- **Role-Based Access Control (RBAC)**: Enforced `admin` vs `user` permissions for restricted resources and endpoints.
- **Application Tracking System**: Full CRUD for scheme applications with duplicate submission protection and status workflow tracking (`Submitted` → `Under Review` → `Approved`/`Rejected`).
- **Audit Logging**: Comprehensive admin action tracking stored in MongoDB.

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Runtime | **Node.js** (v18+) (ES Modules) |
| Framework | **Express.js** (v4.x) |
| Database | **MongoDB** + **Mongoose ODM** (v8.x) |
| Authentication | **JSON Web Token (JWT)** + **bcryptjs** |
| Security | **Helmet**, **CORS**, **Express Rate Limit** |
| Validation | **Express Validator** |
| Logging | **Morgan** |

---

## ⚙️ Prerequisites & Installation

### Prerequisites
1. **Node.js** (v18.0.0 or higher)
2. **MongoDB Community Server** running locally on port `27017` (or a remote MongoDB Atlas URI)

### Installation Steps

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory (refer to `.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/GovernmentSchemeDB
JWT_SECRET=schemeguide_dev_secret_change_in_production_2024
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5500
```

---

## 🌱 Database Seeding

Seed default schemes, default administrator, and demo citizen accounts into your MongoDB database:

```bash
# No sample schemes or credentials are included. Schemes can be entered from the admin interface.

# Bootstrap the first admin with explicit environment variables:
$env:BOOTSTRAP_ADMIN_NAME="Your Name"
$env:BOOTSTRAP_ADMIN_EMAIL="admin@example.gov"
$env:BOOTSTRAP_ADMIN_PASSWORD="use-a-long-unique-password"
$env:MONGODB_URI="mongodb://127.0.0.1:27017/GovernmentSchemeDB"
npm run seed:admin
```

There are no pre-configured seed accounts. The bootstrap script requires credentials from your environment and refuses short passwords.

### Add the verified PM Vishwakarma record

`npm run add:pm-vishwakarma` inserts the sourced scheme if it is not already present and notifies existing citizen accounts. It does not clear or replace other schemes.

---

## 🚀 Running the Server

```bash
# Development mode (with auto-reload via Nodemon)
npm run dev

# Production mode
npm run start
```

The server will start at `http://localhost:5000/api`.

---

## 📖 API Documentation

All request and response bodies use `application/json`.

### 🔐 1. Auth Endpoints (`/api/auth`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new citizen account |
| `POST` | `/api/auth/login` | Public | Authenticate user & receive JWT token |
| `GET` | `/api/auth/me` | Protected | Get current logged-in user profile |

#### Request Example: `POST /api/auth/login`
```json
{
  "email": "citizen@example.com",
  "password": "your-unique-password"
}
```

---

### 👤 2. User Profile Endpoints (`/api/users`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/users/me` | Protected | Fetch profile details |
| `PUT` | `/api/users/me` | Protected | Update profile information |
| `GET` | `/api/users/me/results` | Protected | Fetch historical eligibility check results |
| `GET` | `/api/users/me/applications` | Protected | Fetch user's scheme applications |
| `GET` | `/api/users/me/saved` | Protected | Fetch user's saved/bookmarked schemes |
| `POST` | `/api/users/me/saved/:schemeId` | Protected | Save a scheme to bookmarks |
| `DELETE` | `/api/users/me/saved/:schemeId` | Protected | Remove a scheme from bookmarks |

---

### 🏛️ 3. Scheme Endpoints (`/api/schemes`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/schemes` | Public | List active schemes (supports `search`, `category`, `state`, `department`, `page`, `limit`) |
| `GET` | `/api/schemes/search` | Public | Search schemes by query string |
| `GET` | `/api/schemes/category/:category` | Public | Filter schemes by category |
| `GET` | `/api/schemes/state/:state` | Public | Filter schemes by state |
| `GET` | `/api/schemes/:id` | Public | Get single scheme details (increments view count) |
| `POST` | `/api/schemes` | Admin | Create a new government scheme |
| `PUT` | `/api/schemes/:id` | Admin | Update scheme details |
| `DELETE` | `/api/schemes/:id` | Admin | Delete a scheme |

---

### 🧠 4. Eligibility Engine Endpoint (`/api/eligibility`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/eligibility/check` | Public / Optional Auth | Evaluate profile against all active scheme rules |

#### Request Payload Example:
```json
{
  "age": 22,
  "gender": "Female",
  "annualIncome": 180000,
  "education": "Bachelor's Degree",
  "occupation": "Student",
  "category": "General",
  "state": "Tamil Nadu",
  "disabilityStatus": false
}
```

---

### 📝 5. Application Endpoints (`/api/applications`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/applications` | Protected | Submit a new scheme application |
| `GET` | `/api/applications` | Protected | Get all user applications |
| `GET` | `/api/applications/:id` | Protected | Get single application detail |
| `PUT` | `/api/applications/:id` | Protected | Update application notes |
| `DELETE` | `/api/applications/:id` | Protected | Delete/cancel application |

---

### 🛡️ 6. Admin Endpoints (`/api/admin`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/admin/dashboard` | Admin Only | Get admin dashboard analytics & metrics |
| `GET` | `/api/admin/users` | Admin Only | List all registered citizens |
| `GET` | `/api/admin/schemes` | Admin Only | List all schemes (including inactive) |
| `PUT` | `/api/admin/schemes/:id/rules` | Admin Only | Dynamically update scheme eligibility rules |
| `GET` | `/api/admin/applications` | Admin Only | List all applications across all citizens |
| `PUT` | `/api/admin/applications/:id` | Admin Only | Update application status (`Submitted`, `Under Review`, `Approved`, `Rejected`) |
| `GET` | `/api/admin/eligibility-statistics` | Admin Only | Fetch eligibility engine usage stats |

---

## ⚡ Eligibility Engine Overview

The Server-Side Eligibility Engine (`services/eligibilityEngine.js`) evaluates citizen attributes against criteria defined in each scheme's Mongoose document (`eligibilityRules`):

1. **Age Range**: Evaluates `age >= rule.min` and `age <= rule.max`.
2. **Gender**: Matches against allowed gender list or `'All'`.
3. **Annual Income**: Verifies `annualIncome <= maxAnnualIncome`.
4. **Occupation & Education**: Evaluates against multi-select allowed arrays.
5. **Community / Category**: Matches category (`General`, `OBC`, `SC`, `ST`, `Minority`, `EWS`).
6. **State Coverage**: Matches user state against scheme state list or `'All States'`.
7. **Disability Status**: Evaluates mandatory disability requirement flags.

### Status Classification:
- **`ELIGIBLE`**: All conditions evaluated to `passed`.
- **`NOT_ELIGIBLE`**: At least one condition evaluated to `failed`.
- **`PARTIALLY_ELIGIBLE` / `INSUFFICIENT_INFORMATION`**: One or more fields missing.

---

## 🛡️ Security Features

1. **Password Hashing**: `bcryptjs` with 10 salt rounds automatically applied via Mongoose pre-save middleware.
2. **JWT Security**: Tokens signed with `JWT_SECRET` and set with configurable expiration (`7d`).
3. **Helmet Header Protection**: Protects against well-known web vulnerabilities by setting HTTP security headers.
4. **Rate Limiting**:
   - General API: 200 requests / 15 minutes.
   - Authentication Endpoints: 20 login attempts / 15 minutes.
   - Eligibility Engine: 30 requests / 5 minutes.
5. **Input Validation**: `express-validator` sanitizes and validates input parameters.
6. **CORS Configuration**: Restricts API consumption to configured client origins.
