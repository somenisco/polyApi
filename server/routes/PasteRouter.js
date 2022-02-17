const express = require("express");
const { createPaste } = require("../controllers/CreatePaste");
const { deletePaste } = require("../controllers/DeletePaste");
const getIps = require("../controllers/GetIps");
const {
  getPaste,
  getPastes,
  getEncryptedPaste,
} = require("../controllers/GetPaste");
const { updatePaste } = require("../controllers/UpdatePaste");

const router = express.Router();

router.post("/", createPaste);
router.get("/all", getPastes);
router.get("/:pasteid", getPaste);
router.delete("/:pasteid", deletePaste);
router.put("/edit/:pasteid", updatePaste);
router.post("/encrypted/:pasteid", getEncryptedPaste);
router.get("/access/:pasteid", getIps);

module.exports = router;
