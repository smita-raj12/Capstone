const Joi = require("joi");

function validateWorkOrder(workOrder) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(workOrder, schema);
}


exports.validate = validateWorkOrder;
