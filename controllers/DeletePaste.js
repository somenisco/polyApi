const Paste = require("../schemas/PasteSchema");

const deletePaste = async (req, res, next) => {
  try {
    const paste_id = req.params.pasteid;
    const paste = await Paste.findOne({ shortid: paste_id });
    await Paste.findByIdAndDelete(paste._id);
    res.status(200).json("deleted.");
  } catch (err) {
    const errormessage = err.message;
    res.status(400).json({ errormessage });
  }
};

module.exports = { deletePaste };
