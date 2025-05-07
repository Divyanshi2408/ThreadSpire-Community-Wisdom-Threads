// controllers/searchController.js

const Thread = require("../models/threadModel");
const User = require("../models/userModel");

const searchAll = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Query is required" });

    const regex = new RegExp(q, "i"); // case-insensitive search

    const threads = await Thread.find({ title: regex }).limit(10);
    const users = await User.find({ name: regex }).limit(10);

    const results = [
      ...threads.map((t) => ({ ...t._doc, type: "thread" })),
      ...users.map((u) => ({ ...u._doc, type: "user" })),
    ];

    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};

module.exports = { searchAll };
