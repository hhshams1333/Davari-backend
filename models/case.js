const mongoose = require("mongoose");

const arbiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Arbi = new mongoose.model("Arbi", arbiSchema);

const pSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  faName: {
    type: String,
    required: true,
  },
  idCode: {
    type: Number,
    required: true,
  },
  postCode: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  caseNum: {
    type: Number,
    required: true,
  },
  userAuth: {
    type: String,
    required: true,
  },
});
const P = new mongoose.model("P", pSchema);

const caseSchema = new mongoose.Schema({
  caseNum: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  p1: pSchema,
  p2: pSchema,
  arbi: arbiSchema,
});

exports.CaseModel = new mongoose.model("Case", caseSchema);
exports.PModel = P;
exports.Arbi = Arbi;
