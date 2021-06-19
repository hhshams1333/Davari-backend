const winston = require("winston");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
};
