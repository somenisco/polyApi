const Paste = require("../schemas/PasteSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { customAlphabet } = require("nanoid");
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 10);

const createPaste = async (req, res, next) => {
  try {
    const { content, encrypt, title } = req.body;
    const newPaste = new Paste({ content, encrypted: encrypt, title });
    if (encrypt) {
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      newPaste.hashedPassword = hashedPassword;
    }
    newPaste.shortid = await nanoid();
    await newPaste.save();
    const newPaste_id = newPaste.shortid;
    res.status(200).json({ message: "new paste created.", newPaste_id });
  } catch (err) {
    const errormessage = err.message;
    console.log(err);
    res.status(400).json({ errormessage });
  }
};

module.exports = { createPaste };
