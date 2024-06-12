
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"epicodus",
  database: "timeentrydatabase"
});

module.exports = db;