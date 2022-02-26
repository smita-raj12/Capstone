// const { TimeEntry} = require("../models/timeEntry");
// const { WorkOrder } = require("../models/workOrder");
//const {db} = require ("../startup/db");

const express = require("express");
const router = express.Router();

const mysql = require("mysql");
//const config = require('config');

const db= mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"epicodus",
  database: "timeentrydatabase"
});

module.exports = db;
router.get('/', (req, res)=> {
  //console.log("test1",req);
  const sqlGet = "SELECT _id, date(date), workOrderId, hours FROM timeentries";
  db.query(sqlGet, (err, result)=>{
    console.log(result, err);

      res.send(result);
  })
  
});

module.exports = router;
