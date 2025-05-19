const Thread = require("../models/Thread");

const createThread = async (req, res) => {
  const { title, tags, segments } = req.body;
  const { _id } = req.user;  

  const thread = new Thread({
    title,
    tags,
    segments,
    author: _id,  
  });

  try {
    const saved = await thread.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error creating thread", error: err });
  }
};

const getThreads = async (req, res) => {
  const threads = await Thread.find({})
    .populate("author", "name email")
    .populate("forkedFrom", "title")
    .sort("-createdAt")
    .limit(50);
  res.json(threads);
};

const getMyThreads = async (req, res) => {
  try {
    const myThreads = await Thread.find({ author: req.user._id })
      .populate("author", "name email")
      .populate("forkedFrom", "title")
      .sort("-createdAt");

    res.status(200).json(myThreads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your threads", error });
  }
};

const getThreadById = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id)
      .populate("author", "name email")
      .populate("forkedFrom", "title");

    if (!thread) return res.status(404).json({ message: "Thread not found" });

    res.status(200).json(thread);
  } catch (error) {
    console.error("Error fetching thread by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getThreadsByTag = async (req, res) => {
  try {
    const { tagName } = req.params;

    const threads = await Thread.find({ tags: tagName }).populate('author', 'name email').populate("forkedFrom", "title");;

    res.status(200).json(threads);
  } catch (error) {
    console.error("Error fetching threads by tag:", error);
    res.status(500).json({ message: "Failed to fetch threads for this tag" });
  }
};

const getAllTagsWithCount = async (req, res) => {
  try {
    const tagsWithCounts = await Thread.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { tag: "$_id", count: 1, _id: 0 } }
    ]);

    res.json(tagsWithCounts);
  } catch (error) {
    console.error("Error fetching tags with count:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const reactThread = async (req, res) => {
  const { id } = req.params;
  const { reactionType } = req.body; 
const type = reactionType;


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
  try {
    const original = await Thread.findById(req.params.id);
    
    if (!original) return res.status(404).json({ error: "Original thread not found" });

    const forked = await Thread.create({
      title: original.title,
      segments: original.segments,
      tags: original.tags,
      author: req.user._id,
      forkedFrom: original._id,
    });
    
    const populatedForked = await Thread.findById(forked._id)
      .populate("author", "name email")
      .populate("forkedFrom", "title"); // 👈 Add this
    
    res.status(201).json(populatedForked);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTrendingThreads = async (req, res) => {
  try {
    const threads = await Thread.find({}) 
      .populate("author", "name email")
      .populate("forkedFrom", "title");
  
    const scoredThreads = threads.map((thread) => {
      // Calculate how many hours since the thread was created
      const hoursSincePost = (Date.now() - new Date(thread.createdAt)) / 3600000;

      // Get the count of reactions, bookmarks, and forks
      const reactionsCount = Array.from(thread.reactions?.values() || []).reduce((a, b) => a + b, 0);
      const bookmarksCount = thread.bookmarks?.length || 0;
      const forksCount = thread.forkedFrom ? 1 : 0;

      // Calculate the trending score
      const trendingScore =
        reactionsCount * 1.5 + // Weight reactions more
        bookmarksCount * 2 + // Weight bookmarks more
        forksCount * 2.5 + // Forked threads get extra weight
        -hoursSincePost * 0.1; // Penalize old threads

      return { thread, trendingScore };
    });

    // Sort threads by trending score in descending order
    const sorted = scoredThreads.sort((a, b) => b.trendingScore - a.trendingScore);

    // Send the top 10 trending threads as the response
    res.status(200).json(sorted.slice(0, 10).map((item) => item.thread));
  } catch (error) {
    console.error("Error fetching trending threads:", error);
    res.status(500).json({ message: "Failed to fetch trending threads", error });
  }
};

const updateThread = async (req, res) => {
  const { id } = req.params;
  const { title, tags, segments } = req.body;

  try {
    const thread = await Thread.findById(id);

    if (!thread) return res.status(404).json({ message: "Thread not found" });
    if (thread.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this thread" });
    }

    // Update fields
    thread.title = title || thread.title;
    thread.tags = tags || thread.tags;
    thread.segments = segments || thread.segments;

    const updated = await thread.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating thread:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteThread = async (req, res) => {
  const { id } = req.params;

  try {
    const thread = await Thread.findById(id);

    if (!thread) return res.status(404).json({ message: "Thread not found" });
    if (thread.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this thread" });
    }

    await thread.deleteOne();
    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    console.error("Error deleting thread:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getThreadsByUser = async (req, res) => {
  try {
    const threads = await Thread.find({ author: req.params.id })  // ✅ corrected field
      .sort({ createdAt: -1 });
    res.json(threads);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createThread, getThreads, getMyThreads,getThreadById , getThreadsByTag, getAllTagsWithCount, reactThread, forkThread, getTrendingThreads,updateThread,deleteThread, getThreadsByUser };