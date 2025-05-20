const Thread = require("../models/Thread");
const User = require("../models/User");

const searchAll = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Query is required" });

    const regex = new RegExp(q, "i"); // case-insensitive
    console.log("🔍 Search query regex:", regex);

    const threads = await Thread.find({ title: regex });
    const users = await User.find({ name: regex });

    console.log("🧵 Matched threads:", threads);
    console.log("👤 Matched users:", users);

    res.json({
      threads: threads.map((t) => ({ ...t._doc, type: "thread" })),
      users: users.map((u) => ({ ...u._doc, type: "user" })),
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};



module.exports = { searchAll };
