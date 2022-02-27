
const Joi = require("joi");


function validateTimeEntry(timeEntry) {
  console.log(timeEntry)
  const schema = Joi.object({
    date: Joi.date().required(),
    workOrderId: Joi.number().required(),
    hours: Joi.number().min(0).required(),

  });
  return Joi.validate(timeEntry, schema);
}


exports.validate = validateTimeEntry;
