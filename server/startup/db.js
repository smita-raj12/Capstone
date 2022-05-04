
const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "localhost",
//   user:"root",
//   password:"epicodus",
//   database: "timeentrydatabase"
// });

const db = mysql.createConnection({
    host: "timemanagement.cfdorcrhxxic.us-west-2.rds.amazonaws.com",
    user:"admin",
    password:"aarav2014",
    database: "timeentries"
  });

module.exports = db;