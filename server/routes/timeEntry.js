const  {validate}  = require("../models/timeEntry");
const db = require ("../startup/db");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/email/:emailId",[auth], (req, res)=> {
  const sqlGet = "SELECT a.*, b.name AS workOrderName,  b.description As workOrderDesc, c.name AS userName FROM timeentries a, workorders b, users c WHERE a.workOrderId = b._id AND a.emailId = c.id AND emailId = ? ";
  db.query(sqlGet,[req.params.emailId], (err, result)=>{
      if (err) return res.status(404).send("Read by email failed with Sql error.");
      
      if (!result) return res.status(404).send("The time entries  with the given emailID was not found.");
      res.send(result);
  })
})

router.get('/',[auth,admin], (req, res)=> {
  const sqlGet = "SELECT a.*, b.name,  b.description, c.name AS userName FROM timeentries a, workorders b, users c WHERE a.workOrderId = b._id AND a.emailId = c.id";
  db.query(sqlGet, (err, result)=>{
    if(err)  res.send("error fetching time entries")
      res.send(result);
  })
});

router.post("/",[auth], (req, res)=>{
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {date,workOrderId , hours, emailId} = req.body
 
  const sqlInsert = "INSERT INTO timeentries (date, workOrderId,hours,emailId) VALUES (?,?,?,?);"
  
  db.query(sqlInsert, [date, workOrderId, hours, emailId], (err, result)=>{
  if(err) return res.status(400).send(error.details[0].message)
  if(result) return res.status(200).send(result)
  }); 
});

router.put("/:id",[auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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

router.delete("/:id",[auth], async (req, res) => {
    const timeEntryDelete = "DELETE FROM timeentries WHERE _id = ?";
    db.query(timeEntryDelete, [req.params.id], (err, result)=>{
      if(err) console.log(err);
      
    if (!result)
      return res
        .status(404)
        .send("The timeEntry with the given ID was not found.");
    
    res.send(result);
  })
});



module.exports = router;
