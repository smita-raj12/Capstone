const Joi = require("joi");


function validateTimeEntry(timeEntry) {
  const schema = {
    date: Joi.date().required(),
    workOrderId: Joi.objectId().required(),
    hours: Joi.number().min(0).required(),
    devCode: Joi.string().required().min(8).max(8)
  };

  return Joi.validate(timeEntry, schema);
}


exports.validate = validateTimeEntry;
