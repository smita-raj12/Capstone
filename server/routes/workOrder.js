
const { WorkOrder } = require("../models/workOrder");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const workOrders = await WorkOrder.find().select("-__v")

  
  res.send(workOrders);
});



module.exports = router;
