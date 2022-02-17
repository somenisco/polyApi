const Paste = require("../schemas/PasteSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createPaste = async (req, res, next) => {
  try {
    const { content, encrypt } = req.body;
    const newPaste = new Paste({ content, encrypted: encrypt });
    if (encrypt) {
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      newPaste.hashedPassword = hashedPassword;
    }
    await newPaste.save();
    const newPaste_id = newPaste.shortid;
    res.status(200).json({ message: "new paste created.", newPaste_id });
  } catch (err) {
    const errormessage = err.message;
    res.status(400).json({ errormessage });
  }
};

module.exports = { createPaste };
