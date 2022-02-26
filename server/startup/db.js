
const mysql = require("mysql");
//const config = require('config');

const db= mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"epicodus",
  database: "timeentrydatabase"
});

module.exports = db;