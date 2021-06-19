const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("نام کاربری یا رمز عبور نادرست است.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("نام کاربری یا رمز عبور نادرست است.");

  if (user.userAuth !== req.body.userAuth)
    return res.status(400).send("نام کاربری یا رمز عبور نادرست است");
  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = new Joi.object({
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    userAuth: Joi.string().required(),
  });

  return schema.validate(req.body);
}

module.exports = router;
