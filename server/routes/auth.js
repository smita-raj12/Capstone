const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const {  generateAuthToken } = require("../models/user");
const express = require('express');
const router = express.Router();
const db = require ("../startup/db");

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const {email, password} = req.body;
 
    if(!email) return res.status(400).send("Invalid Email.");

     let getUser = "SELECT * FROM users WHERE email = ?;"
      db.query(getUser, [email], async (err, result)=>{
      if(err) return res.status(400).send("Invalid Email.");
  
      if (!result) return res.status(400).send("Invalid User Name and password.");
            
      const validPassword = await bcrypt.compare(password, result[0].password);
      
      if (!validPassword) return res.status(400).send('Invalid email or password.');
      const token = generateAuthToken(result[0]);
      res.send(token);
    }); 
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 
