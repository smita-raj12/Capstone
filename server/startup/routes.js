const express = require("express");

const timeEntry = require("../routes/timeEntry");
const workOrder = require("../routes/workOrder");


module.exports = function (app) {
  app.use(express.json());

  app.use("/api/timeEntry", timeEntry);
  app.use("/api/workOrder", workOrder);
};
