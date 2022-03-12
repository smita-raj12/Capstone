const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {  validate, generateAuthToken } = require("../models/user");
const express = require("express");
const router = express.Router();
const db = require ("../startup/db");
const { result } = require("lodash");

router.get("/me", auth, async (req, res) => {
  const {email,password,name, role} = req.body;
  const user = "SELECT * FROM users WHERE email = ?;"
  db.query(user, [email, password, name, role], (err, result)=>{
    console.log(err);
    res.send(result);
  }); 
 
});

router.get("/", auth, async (req, res) => {
  // const {name} = req.body;
  const userQuery = "SELECT * FROM users;"
  db.query(userQuery, (err, result)=>{
   if(err) return res.send(err);
   res.send(result);
  }); 
 
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    const {email,password,name,role} = req.body;
    var getUser = " "
    if(email) 
    { getUser = "SELECT * FROM users WHERE email = ?;"}
    db.query(getUser, [email, password, name], (err, result)=>{
      console.log(err);
      if (!result) return res.status(400).send("User already registered.");
    }); 

    const user = {name:name, email:email,password:password,role:role}

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    insertUser = "INSERT INTO users (email, password, name, role) VALUES (?,?,?,?);"
    db.query(insertUser,[email, password, name, role], (err, result)=>{
     if(err) res.send("Error while registering user");
    }); 

  const token = generateAuthToken(user);
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email","role"]));
});

module.exports = router;
