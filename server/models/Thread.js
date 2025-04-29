const mongoose = require("mongoose");

const segmentSchema = new mongoose.Schema({
  content: { type: String, required: true }
});

const threadSchema = new mongoose.Schema(
  {
    title: String,
    tags: [String],
    segments: [segmentSchema],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reactions: {
      brain: { type: Number, default: 0 },
      fire: { type: Number, default: 0 },
      clap: { type: Number, default: 0 },
      eyes: { type: Number, default: 0 },
      warning: { type: Number, default: 0 }
    },
    forkedFrom: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Thread", threadSchema);