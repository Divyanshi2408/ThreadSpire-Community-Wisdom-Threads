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

module.exports = { createCollection, getCollections };