
const mysql = require("mysql");

const db= mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"Ragu@2905",
  database: "timeentrydatabase"
});

module.exports = db;