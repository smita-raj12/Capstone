
//const { WorkOrder } = require("../models/workOrder");

const express = require("express");
const router = express.Router();
const db = require ("../startup/db");

router.get('/', (req, res)=> {
  const sqlGet = "SELECT * FROM workorders";
  db.query(sqlGet, (err, result)=>{
      res.send(result);
  })
  
});

router.delete("/:id", async (req, res) => {
  const timeEntry = ("DELETE FROM workorders WHERE name = ?");

  if (!timeEntry)
    return res
      .status(404)
      .send("The timeEntry with the given ID was not found.");

  res.send(timeEntry);
});

module.exports = router;
