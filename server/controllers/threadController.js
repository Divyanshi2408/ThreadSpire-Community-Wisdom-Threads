const Thread = require("../models/Thread");

const createThread = async (req, res) => {
  const { title, tags, segments } = req.body;
  const thread = new Thread({
    title,
    tags,
    segments,
    author: req.user._id
  });
  const saved = await thread.save();
  res.status(201).json(saved);
};

const getThreads = async (req, res) => {
  const threads = await Thread.find({})
    .populate("author", "email")
    .sort("-createdAt")
    .limit(50);
  res.json(threads);
};
const getThreadById = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id).populate("author", "email");
    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }
    res.json(thread);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const reactThread = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized: No user" });
  }

  const userId = req.user._id.toString();

  const allowedReactions = ["brain", "fire", "clap", "heart", "rocket"];
  if (typeof type !== "string" || !allowedReactions.includes(type)) {
    return res.status(400).json({ message: "Invalid or missing reaction type" });
  }

  try {
    const thread = await Thread.findById(id);
    if (!thread) return res.status(404).json({ message: "Thread not found" });

    const previousReaction = thread.reactedUsers?.get(userId);

    // User clicked same reaction → remove it
    if (previousReaction === type) {
      thread.reactions.set(type, Math.max((thread.reactions.get(type) || 1) - 1, 0));
      thread.reactedUsers.delete(userId);
    } else {
      // Remove old if exists
      if (previousReaction) {
        thread.reactions.set(
          previousReaction,
          Math.max((thread.reactions.get(previousReaction) || 1) - 1, 0)
        );
      }
      // Add new
      thread.reactions.set(type, (thread.reactions.get(type) || 0) + 1);
      thread.reactedUsers.set(userId, type);
    }

    await thread.save();

    res.status(200).json({
      message: "Reaction updated",
      reactions: Object.fromEntries(thread.reactions),
      userReaction: thread.reactedUsers.get(userId) || null,
    });
  } catch (error) {
    console.error("Reaction error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



const forkThread = async (req, res) => {
  const original = await Thread.findById(req.params.id);
  if (!original) return res.status(404).json({ message: "Thread not found" });
  const forked = await Thread.create({
    title: original.title,
    tags: original.tags,
    segments: original.segments,
    author: req.user._id,
    forkedFrom: original._id
  });
  res.status(201).json(forked);
};

module.exports = { createThread, getThreads,getThreadById, reactThread, forkThread };