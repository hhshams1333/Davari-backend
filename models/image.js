const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  caseNum: String,
  title: String,
  desc: String,
  url: String,
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model("Image", imageSchema);

// const jwt = require("jsonwebtoken");
// const Joi = require("joi");
// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     { _id: this._id, name: this.name, userAuth: this.userAuth },
//     "hamidreza"
//   );
//   return token;
// };
// function validateUser(user) {
//   const schema = Joi.object({
//     username: Joi.string().min(5).max(50).required(),
//     password: Joi.string().min(5).max(255).required(),
//     userAuth: Joi.string().required(),
//     name: Joi.string().required(),
//     faName: Joi.string(),
//     idCode: Joi.number(),
//     postCode: Joi.number(),
//     phoneNumber: Joi.number(),
//     address: Joi.string(),
//     caseNum: Joi.number(),
//   });

// return schema.validate(user);
//}
