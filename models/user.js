const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  faName: {
    type: String,
  },
  idCode: {
    type: Number,
  },
  postCode: {
    type: Number,
  },
  phoneNumber: {
    type: Number,
  },
  address: {
    type: String,
  },
  caseNum: {
    type: Number,
  },

  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  userAuth: {
    type: String,
    reqiured: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, userAuth: this.userAuth },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
    userAuth: Joi.string().required(),
    name: Joi.string().required(),
    faName: Joi.string(),
    idCode: Joi.number(),
    postCode: Joi.number(),
    phoneNumber: Joi.number(),
    address: Joi.string(),
    caseNum: Joi.number(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
