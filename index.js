const winston = require("winston");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose.set("useFindAndModify", false);
process.env.nedayeadl_jwtPrivateKey = "hamidrezaShams";
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 3001;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
