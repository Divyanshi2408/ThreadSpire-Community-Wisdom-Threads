const express = require("express");
const router = express.Router();
const {
  createCollection,
  getCollections
} = require("../controllers/collectionController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, createCollection).get(protect, getCollections);

module.exports = router;
