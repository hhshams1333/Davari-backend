const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  let user = await new User({
    name: req.body.name,
    faName: req.body.faName,
    idCode: req.body.idCode,
    postCode: req.body.postCode,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    username: req.body.caseNum,
    password: req.body.idCode,
    userAuth: req.body.userAuth,
    caseNum: req.body.caseNum,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(user);
});

module.exports = router;
