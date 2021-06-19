const express = require("express");
const file = require("../services/form");
const fs = require("fs");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, (req, res) => {
  const path = req.body.caseNum ? `files/${req.body.caseNum}/` : "files/";
  fs.access(path, function (error) {
    if (error) {
      return fs.mkdir(path, (error) => res.send(error));
    }
  });

  file.genAnnounce(path, req.body);
  res.send("ok");
});

router.get("/", (req, res) => {
  const p = "files/announce.pdf";
  const stream = fs.createReadStream(p);
  stream.on("error", (err) => {
    return res.status(404).send("no such file");
  });
  stream.pipe(res);
});

module.exports = router;
