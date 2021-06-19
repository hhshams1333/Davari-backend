const { CaseModel, PModel, Arbi } = require("../models/case");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { name, faName, idCode, postCode, phoneNumber, address, userAuth } =
    req.body.p1;
  const {
    name: np2,
    faName: fp2,
    idCode: ip2,
    postCode: pp2,
    phoneNumber: php2,
    address: ap2,
    userAuth: up2,
  } = req.body.p2;
  let caseObj = new CaseModel({
    caseNum: req.body.caseNum,
    value: req.body.value,
    p1: new PModel({
      name,
      faName,
      idCode,
      postCode,
      phoneNumber,
      address,
      caseNum: req.body.caseNum,
      userAuth,
    }),
    p2: new PModel({
      name: np2,
      faName: fp2,
      idCode: ip2,
      postCode: pp2,
      phoneNumber: php2,
      address: ap2,
      caseNum: req.body.caseNum,
      userAuth: up2,
    }),
    arbi: new Arbi({ name: req.body.arbi }),
  });
  await caseObj.save();
  res.send(caseObj);
});

router.get("/", auth, async (req, res) => {
  const cases = await CaseModel.find();
  res.send(cases);
});

router.get("/subCase/:caseNum", auth, async (req, res) => {
  const caseItem = await CaseModel.findOne({ caseNum: req.params.caseNum });
  res.send(caseItem);
});

router.get("/:id", auth, async (req, res) => {
  const caseItem = await CaseModel.findOne({ _id: req.params.id });
  res.send(caseItem);
});

router.put("/:id", auth, async (req, res) => {
  const caseItem = await CaseModel.findByIdAndUpdate(
    req.params.id,
    {
      caseNum: req.body.caseNum,
      p1: new PModel({
        name: req.body.p1.name,
        faName: req.body.p1.faName,
        idCode: req.body.p1.idCode,
        postCode: req.body.p1.postCode,
        phoneNumber: req.body.p1.phoneNumber,
        address: req.body.p1.address,
        caseNum: req.body.caseNum,
        userAuth: req.body.p1.userAuth,
      }),
      p2: new PModel({
        name: req.body.p2.name,
        faName: req.body.p2.faName,
        idCode: req.body.p2.idCode,
        postCode: req.body.p2.postCode,
        phoneNumber: req.body.p2.phoneNumber,
        address: req.body.p2.address,
        caseNum: req.body.caseNum,
        userAuth: req.body.p2.userAuth,
      }),
    },
    { new: true }
  );

  if (!caseItem) return res.status(404).send("پرونده با مشخصات فوق یافت نشد");

  res.send(caseItem);
});

router.delete("/:id", auth, async (req, res) => {
  const caseItem = await CaseModel.findByIdAndRemove(req.params.id);

  if (!caseItem)
    return res.status(404).send("The Case with the given ID was not found.");

  res.send(caseItem);
});
module.exports = router;
