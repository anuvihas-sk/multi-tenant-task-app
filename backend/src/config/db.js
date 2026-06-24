const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "db", // Docker service name
  password: "password",
  database: "taskdb",
  port: 5432,
});

module.exports = pool;