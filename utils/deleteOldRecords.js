const Paste = require("../schemas/PasteSchema");

async function deleteOldDocument() {
  const nowdate = new Date(Date.now());
  const deletingdocs = await Paste.find({
    expiry: { $lt: nowdate },
  });
  deletingdocs.forEach(async (d) => {
    await Paste.findByIdAndDelete(d._id);
  });

  setInterval(deleteOldDocument, 3600000);
}

module.exports = deleteOldDocument;
