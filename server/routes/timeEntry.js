const  {validate}  = require("../models/timeEntry");
const db = require ("../startup/db");
//const Joi = require("joi");

const express = require("express");
const router = express.Router();


router.get('/', (req, res)=> {
  
  const sqlGet = "SELECT _id, date(date), workOrderId, hours FROM timeentries";
  db.query(sqlGet, (err, result)=>{
    //console.log(result, err);

      res.send(result);
  })
  
});

router.post("/", (req, res)=>{
  const date = req.body.date
  const workOrderId = req.body.workOrderId
  const hours = req.body.hours

  const sqlInsert = "INSERT INTO timeentries (date, workOrderId,hours) VALUES (?,?,?);"
  
  console.log(sqlInsert)
  db.query(sqlInsert, [date, workOrderId, hours], (err, result)=>{
  console.log(err);
  }); 
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
    console.log("Put request",  error);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body,req.params.id);
  const { workOrderId, hours } = req.body

  const sqlUpdate = "UPDATE timeentries SET workOrderId = ?, hours= ? WHERE _id = ?";

  db.query(sqlUpdate, [workOrderId, hours, req.params.id], (err, result)=>{
      if(err) console.log(err);
      if (!result){
    return res
      .status(404)
      .send("The timeEntry with the given ID was not found.");
      }
  res.send(result);
  })
  
});

router.delete("/:id", async (req, res) => {
  const timeEntry = ("DELETE FROM timeentries WHERE hours = ?");

  if (!timeEntry)
    return res
      .status(404)
      .send("The timeEntry with the given ID was not found.");

  res.send(timeEntry);
});

module.exports = router;
