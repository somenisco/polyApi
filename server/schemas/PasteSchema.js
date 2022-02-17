const mongoose = require("mongoose");
const Access = require("./AccessSchema");
const { customAlphabet } = require("nanoid");
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 8);

const Schema = mongoose.Schema;

const PasteSchema = new Schema(
  {
    shortid: { type: String, unique: true, required: true, default: nanoid() },
    content: { type: String, required: true },
    expiry: { type: Date, required: true, default: Date.now() + 86400000 },
    encrypted: { type: Boolean, required: true, default: false },
    hashedPassword: { type: String },
    accessIps: [
      {
        type: Schema.Types.ObjectId,
        ref: "Access",
      },
    ],
  },
  {
    timestamps: true,
  }
);

PasteSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Access.deleteMany({
      _id: {
        $in: doc.accessIps,
      },
    });
  }
});

const Paste = mongoose.model("Paste", PasteSchema);

module.exports = Paste;
