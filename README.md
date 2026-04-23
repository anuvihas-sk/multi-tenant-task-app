# 🧠 Multi-Tenant Task Management System

A full-stack web application that enables multiple organizations to manage tasks securely with **Role-Based Access Control (RBAC)** and **JWT authentication**, ensuring strict **data isolation** between tenants.

---

## 🚀 Features

### 🔐 Authentication
- User registration & login
- Secure authentication using **JWT (JSON Web Tokens)**

### 🏢 Multi-Tenancy
- Each user belongs to an **organization**
- Data is strictly isolated using `org_id`

### 👥 Role-Based Access Control (RBAC)
- **Admin**
  - Can view & manage all tasks in the organization
- **Member**
  - Can manage only tasks created by them

### 📋 Task Management (CRUD)
- Create tasks
- View tasks
- Update tasks
- Delete tasks

### 📜 Audit Logs
- Tracks actions like:
  - Task creation
  - Task deletion
  - Updates
- Stored in `audit_logs` table

### 🐳 Docker Support
- Containerized backend and database using Docker
- Easy setup using `docker-compose`

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router

### Backend
- Node.js
- JWT (jsonwebtoken)

### Database
- PostgreSQL

### DevOps
- Docker
- Docker Compose

---

