const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
//const {User} = require('../models/user');
const {  generateAuthToken } = require("../models/user");
const express = require('express');
const router = express.Router();
const db = require ("../startup/db");

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const {email, password} = req.body;
  var getUser = " "
    if(email) 
    { getUser = "SELECT * FROM users WHERE email = ?;"
    db.query(getUser, [email], (err, result)=>{
      console.log(err);
      if (!result) return res.status(400).send("Invalid User Name and password.");
      console.log("result",result[0].password)
      //const user ={password: result[0].password,
  //       email:result[0].email,
  //     name:result[0].name}
  //     console.log("user",user)
  //     return user
    }); }
  //   console.log("compare" ,password, user1);
  // const validPassword = await bcrypt.compare(password, user.password);
  
  //if (!validPassword) return res.status(400).send('Invalid email or password.');

//   const token = generateAuthToken(user1);
//   res.send(token);
 });

// function validate(req) {
//   const schema = {
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(5).max(255).required()
//   };

//   return Joi.validate(req, schema);
// }

module.exports = router; 
