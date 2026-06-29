# 🚀 Multi-Tenant Task App

This is a **multi-tenant task management system** where multiple organizations can manage users, tasks, and activity logs separately using `org_id`.

---

## 🚀 Setup Instructions

1. Clone the repository  
git clone <repo-link>

2. Install dependencies  
npm install

3. Start database (Docker)  
docker compose up -d

4. Create database tables  
docker exec -i multi-tenant-task-app_db_1 psql -U postgres -d taskdb < database.sql

5. Configure database connection in db.js

6. Start backend server  
node index.js

7. Start frontend UI  
npm run dev

---

## 🛢️ Database Setup (PostgreSQL)

Run this SQL:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    org_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT REFERENCES users(id),
    org_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    user_id INT REFERENCES users(id),
    task_id INT REFERENCES tasks(id),
    org_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

## 📌 What this project does

### 👤 Users Table
Stores user information (name, email, password, org_id)  
👉 Used for authentication and organization-based access

---

### 📋 Tasks Table
Stores tasks created by users  
👉 Each task belongs to a user and an organization

---

### 🧾 Audit Logs Table
Tracks all actions in the system  
👉 Used for monitoring and activity history (who created/updated/deleted tasks)

---

## 🧠 Why this project is used

- Multi-tenant system (like SaaS apps)
- Task management system
- Tracks user actions for security (audit logs)
- Organization-based data separation using `org_id`

---

## ⚡ Tech Stack

- Node.js
- Express.js
- PostgreSQL (Docker)
- React (Vite)

---

## 🚀 Key Feature

Each organization has:
- separate users
- separate tasks
- separate activity logs