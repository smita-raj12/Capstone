
const Joi = require("joi");


function validateTimeEntry(timeEntry) {
  const schema = Joi.object({
    date: Joi.date().required(),
    workOrderId: Joi.number().required(),
    hours: Joi.number().min(0).required(),
    emailId: Joi.number().min(0).required(),

  });
  return Joi.validate(timeEntry, schema);
}


exports.validate = validateTimeEntry;
