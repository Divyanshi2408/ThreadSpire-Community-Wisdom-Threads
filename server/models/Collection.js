const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
  isPrivate: { type: Boolean, default: false }
});

module.exports = mongoose.model("Collection", collectionSchema);