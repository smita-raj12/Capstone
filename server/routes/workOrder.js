
//const { WorkOrder } = require("../models/workOrder");

const express = require("express");
const router = express.Router();
const db = require ("../startup/db");

router.get('/', (req, res)=> {
  //console.log("test1",req);
  const sqlGet = "SELECT * FROM workorders";
  db.query(sqlGet, (err, result)=>{
    console.log(result, err);
    res.send(result);
  })
  
});


module.exports = router;
