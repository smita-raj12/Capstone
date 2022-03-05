const db = require ("../startup/db");
const express = require("express");
const router = express.Router();


router.get("/", (req, res)=> {

  const sqlGet = "SELECT MAX(_id) FROM timeentries";
  db.query(sqlGet, (err, result)=>{
      console.log(result, err);
      res.send(result);
  })
  
});

module.exports = router;