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

    // ✅ Comments array
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Thread", threadSchema);
