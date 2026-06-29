## Setup Instructions

1. Clone the repository
   git clone <repo-link>

2. Install dependencies
   npm install

3. Create MySQL database
   Run SQL commands from database.sql

4. Configure database connection in db.js

5. Start the server
     node index.js
   Start the UI
     npm run dev


   ## Database Setup

Run this in MySQL:

CREATE DATABASE auth_app;

USE auth_app;

CREATE DATABASE auth_app;

USE auth_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    org_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);