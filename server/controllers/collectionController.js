// ✅ UPDATED BACKEND TO SUPPORT ADDING THREAD TO COLLECTION

// controllers/collectionController.js
const Collection = require("../models/Collection");

const createCollection = async (req, res) => {
  const { name, threads, isPrivate } = req.body;
  const collection = await Collection.create({
    user: req.user._id,
    name,
    threads,
    isPrivate
  });
  res.status(201).json(collection);
};

const getCollections = async (req, res) => {
  const collections = await Collection.find({ user: req.user._id });
  res.json(collections);
};

// ✅ Add thread to a specific collection
const addThreadToCollection = async (req, res) => {
  const { collectionId } = req.params;
  const { threadId } = req.body;

  try {
    const collection = await Collection.findOne({
      _id: collectionId,
      user: req.user._id
    });

    if (!collection) return res.status(404).json({ message: "Collection not found" });

    if (!collection.threads.includes(threadId)) {
      collection.threads.push(threadId);
      await collection.save();
    }

    res.json({ message: "Thread added to collection", collection });
  } catch (error) {
    res.status(500).json({ message: "Error adding thread to collection" });
  }
};

module.exports = { createCollection, getCollections, addThreadToCollection };
