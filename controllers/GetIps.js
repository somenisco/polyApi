const Paste = require("../schemas/PasteSchema");
const Access = require("../schemas/AccessSchema");

const getIps = async (req, res, next) => {
  try {
    const paste_id = req.params.pasteid;
    const paste = await Paste.findOne({ shortid: paste_id }).populate(
      "accessIps"
    );
    const ips = paste.accessIps;
    ips.sort(function (a, b) {
      return b.createdAt - a.createdAt;
    });
    res.status(200).json(ips);
  } catch (err) {
    const errormessage = err.message;
    res.status(400).json({ errormessage });
  }
};

module.exports = getIps;
