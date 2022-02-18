const Paste = require("../schemas/PasteSchema");

const updatePaste = async (req, res, next) => {
  try {
    const expiry = req.body.expiry;
    const paste_id = req.params.pasteid;
    const req_paste = await Paste.findOne({ shortid: paste_id });
    if (expiry != 0) {
      req_paste.expiry = Date.now() + expiry;
    }
    await req_paste.save();
    res.status(200).json("updated.");
  } catch (err) {
    const errormessage = err.message;
    res.status(400).json({ errormessage });
  }
};

module.exports = { updatePaste };
