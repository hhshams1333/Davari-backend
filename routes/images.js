const imgModel = require("../models/image");
const path = require("path");
const multer = require("multer");
const EventEmitter = require("events");
const emitter = new EventEmitter();
const express = require("express");
const router = express.Router();
const fs = require("fs");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { caseNum } = req.params;
    const path = `files/${caseNum}`;
    fs.access(path, function (error) {
      if (error) {
        return fs.mkdir(path, (error) => cb(error, path));
      } else {
        return cb(null, path);
      }
    });
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

router.post("/:caseNum", [auth, upload.single("file")], async (req, res) => {
  try {
    var obj = {
      title: req.body.title,
      desc: req.body.desc,
      url: req.file.filename,
      caseNum: req.params.caseNum,
    };
    let img = new imgModel(obj);
    await img.save();

    if (req.file == undefined) {
      return res.send(`یک فایل انتخاب کنید`);
    }
    res.send(img);
  } catch (error) {
    return res.send(`Error when trying upload image: ${error}`);
  }
});

router.get("/:caseNum", auth, async (req, res) => {
  const imageUrls = await imgModel
    .find({ caseNum: req.params.caseNum })
    .select("-_id -caseNum -__v -desc");
  return res.send(imageUrls);
});

router.get("/:caseNum/:filename", async (req, res) => {
  const p = `${__dirname}/../files/${req.params.caseNum}/${req.params.filename}`;
  const stream = fs.createReadStream(p);
  stream.on("error", (err) => {
    return res.status(404).send("این فایل وجود ندارد");
  });
  stream.pipe(res);
});

module.exports = router;
