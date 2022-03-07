const config = require("config");

module.exports = function(req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden
  console.log(process.env.requiresAuth)
  if (!config.get("requiresAuth")) return next();
  console.log(req.user.role)
  if (req.user.role !== "MANAGER") return res.status(403).send("Access denied.");
  
  next();
};
