
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

router.post("/", (req, res)=>{
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const name = req.body.name
  const desc = req.body.desc

  const sqlInsert = "INSERT INTO workorders (name, desc) VALUES (?,?);"
  
  db.query(sqlInsert, [name, desc], (err, result)=>{
  console.log(err);
  }); 
});


router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
 
  const { name, desc } = req.body

  const sqlUpdate = "UPDATE workorders SET name = ?, desc= ? WHERE _id = ?";

  db.query(sqlUpdate, [name, desc, req.params.id], (err, result)=>{
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
  //const id = req.body._id
  const workOrderDelete = "DELETE FROM workorders WHERE _id = ?";
  db.query(workOrderDelete, [req.params.id], (err, result)=>{
    if(err) console.log(err);
    
  if (!result)
    return res
      .status(404)
      .send("The timeEntry with the given ID was not found.");
  
  res.send(result);
})
});
module.exports = router;
