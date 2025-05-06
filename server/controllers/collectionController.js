const Collection = require("../models/Collection");
const mongoose = require("mongoose");

const createCollection = async (req, res) => {
  const { name, threads, isPrivate } = req.body;
  const collection = await Collection.create({
    user: req.user._id,
    name,
    threads,
    isPrivate,
  });

  await collection.populate('threads');

  res.status(201).json(collection);
};

const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.user._id }).populate('threads');
    res.json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching collections" });
  }
};


const addThreadToCollection = async (req, res) => {
  const { collectionId } = req.params;
  const { threadId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(threadId)) {
      return res.status(400).json({ message: "Invalid thread ID" });
    }

    const collection = await Collection.findOne({
      _id: collectionId,
      user: req.user._id,
    });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    if (!collection.threads.includes(threadId)) {
      collection.threads.push(threadId);
      await collection.save();
    }

    await collection.populate('threads');

    res.json({ message: "Thread added to collection", collection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding thread to collection" });
  }
};


module.exports = { createCollection, getCollections, addThreadToCollection };
