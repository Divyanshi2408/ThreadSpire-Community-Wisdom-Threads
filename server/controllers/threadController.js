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
  const { type } = req.body; // brain, fire, etc.
  const thread = await Thread.findById(id);
  if (!thread) return res.status(404).json({ message: "Thread not found" });
  thread.reactions[type] += 1;
  await thread.save();
  res.json(thread);
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