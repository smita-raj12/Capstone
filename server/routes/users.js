const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {  validate, generateAuthToken } = require("../models/user");
const express = require("express");
const router = express.Router();
const db = require ("../startup/db");

router.get("/me", auth, async (req, res) => {
  console.log("user", req);
  const {email,password,name} = req.body;
  const user = "SELECT * FROM users WHERE email = ?;"
  db.query(user, [email, password, name], (err, result)=>{
    console.log(err);
  }); 
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    const {email,password,name} = req.body;
    var getUser = " "
    if(email) 
    { getUser = "SELECT * FROM users WHERE email = ?;"}
    db.query(getUser, [email, password, name], (err, result)=>{
      console.log(err);
      if (!result) return res.status(400).send("User already registered.");
    }); 

    const user = {name:name, email:email,password:password}

    // const user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    //console.log("hashed password",user.password);
    insertUser = "INSERT INTO users (email, password, name) VALUES (?,?,?);"
    db.query(insertUser,[user.email, user.password, user.name], (err, result)=>{
      console.log(err);
    }); 

  const token = generateAuthToken(user);
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
