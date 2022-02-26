
const db = require ("../startup/db");

const express = require("express");
const router = express.Router();



router.get('/', (req, res)=> {
  //console.log("test1",req);
  const sqlGet = "SELECT _id, date(date), workOrderId, hours FROM timeentries";
  db.query(sqlGet, (err, result)=>{
    console.log(result, err);

      res.send(result);
  })
  
});

module.exports = router;
