// const mongoose = require("mongoose");

// const segmentSchema = new mongoose.Schema({
//   content: { type: String, required: true }
// });

// const threadSchema = new mongoose.Schema(
//   {
//     title: String,
//     tags: [String],
//     segments: [segmentSchema],
//     author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     // reactions: {
//     //   brain: { type: Number, default: 0 },
//     //   fire: { type: Number, default: 0 },
//     //   clap: { type: Number, default: 0 },
//     //   eyes: { type: Number, default: 0 },
//     //   warning: { type: Number, default: 0 }
//     // },
//     reactions: {
//     type: Map,
//     of: [
//       {
//         user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//       },
//     ],
//     default: {},
//   },
//     forkedFrom: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Thread", threadSchema);

const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema(
  {
    title: String,
    tags: [String],
    segments: [
      {
        content: String,
        media: String,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reactions: {
      type: Map,
      of: Number,
      default: {
        brain: 0,
        fire: 0,
        heart: 0,
        rocket: 0,
        clap: 0,
      },
    },
    reactedUsers: {
      type: Map,
      of: String, // reaction type (e.g., brain, fire)
      default: {},
    },
    forkedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Thread", threadSchema);
