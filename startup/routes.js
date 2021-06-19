const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const cases = require("../routes/cases");
const images = require("../routes/images");
const test = require("../routes/announce");
const cors = require("cors");
module.exports = function (app) {
  app.use(express.json());
  app.use(cors());

  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/images", images);
  app.use("/api/cases", cases);
  app.use("/api/announce", test);
  app.use(error);
};
