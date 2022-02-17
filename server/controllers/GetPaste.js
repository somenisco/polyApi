const Paste = require("../schemas/PasteSchema");
const Access = require("../schemas/AccessSchema");
const bcrypt = require("bcrypt");
const axios = require("axios");

const getPastes = async (req, res, next) => {
  try {
    const pastes = await Paste.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(pastes);
  } catch (err) {
    const errormessage = err.message;
    res.status(400).json({ errormessage });
  }
};

const getPaste = async (req, res, next) => {
  try {
    const paste_id = req.params.pasteid;
    const req_paste = await Paste.findOne({ shortid: paste_id });
    if (req_paste) {
      const result = await axios.get("https://ipapi.co/json/");
      const new_ip = new Access({ ipadd: result.data.ip });
      await new_ip.save();
      req_paste.accessIps.push(new_ip);
      await req_paste.save();
      if (req_paste.encrypted) {
        return res.status(200).json({ message: "encrypted data." });
      }
    }
    res.status(200).json(req_paste);
  } catch (err) {
    console.log(err);
    const errormessage = err.message;
    res.status(400).json({ errormessage });
  }
};

const getEncryptedPaste = async (req, res, next) => {
  try {
    const paste_id = req.params.pasteid;
    const password = req.body.password;
    const req_paste = await Paste.findOne({ shortid: paste_id });
    const result = await bcrypt.compare(password, req_paste.hashedPassword);
    if (result) {
      res.status(200).json(req_paste);
    } else {
      res.json({ message: "not matched" });
    }
  } catch (err) {
    const errormessage = err.message;
    console.log(err);
    res.status(400).json({ errormessage });
  }
};

module.exports = { getPaste, getPastes, getEncryptedPaste };
