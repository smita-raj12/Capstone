const express = require("express");

const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db");


const PORT = 3001
const server= app.listen(PORT,() => {
    console.log(`running on port ${PORT}`);
});


module.exports = server;