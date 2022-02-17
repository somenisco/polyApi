const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccessSchema = new Schema(
  {
    ipadd: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Access = mongoose.model("Access", AccessSchema);

module.exports = Access;
