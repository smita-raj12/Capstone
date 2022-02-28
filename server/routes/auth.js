const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
//const {User} = require('../models/user');
const {  generateAuthToken } = require("../models/user");
const express = require('express');
const router = express.Router();
const {GetUser} = require("./Sqlqueries/AuthSql")
const db = require ("../startup/db");

// router.post('/', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);
  
//   const {email, password} = req.body;
//   var getUser = " "
//     if(email) 
//     //let user = GetUser(email)
   
//     console.log("compare" ,password, user);
//   const validPassword = await bcrypt.compare(password, user.password);
  
//   if (!validPassword) return res.status(400).send('Invalid email or password.');

//   const token = generateAuthToken(user);
//   res.send(token);
// });

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 
