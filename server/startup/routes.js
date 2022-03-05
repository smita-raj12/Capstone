const express = require("express");

const timeEntry = require("../routes/timeEntry");
const workOrder = require("../routes/workOrder");
const users = require("../routes/users");
const auth = require("../routes/auth");
const maxTimeEntry = require("../routes/maxTimeEntry");

const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());

  app.use("/api/timeEntry", timeEntry);
  app.use("/api/maxTimeEntry", maxTimeEntry);
  app.use("/api/workOrder", workOrder);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  
  app.use(error);
};
