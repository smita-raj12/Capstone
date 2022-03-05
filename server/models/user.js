const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

function generateAuthToken (user) {
  console.log("user",user)
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

exports.generateAuthToken = generateAuthToken;
exports.validate = validateUser;
