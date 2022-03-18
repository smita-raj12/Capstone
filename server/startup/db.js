
const mysql = require("mysql");

const db= mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"Your-password",
  database: "timeentrydatabase"
});

module.exports = db;