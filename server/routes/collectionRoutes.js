// routes/collectionRoutes.js
const express = require("express");
const router = express.Router();
const {
  createCollection,
  getCollections,
  addThreadToCollection,
} = require("../controllers/collectionController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, createCollection).get(protect, getCollections);

router.route("/:collectionId/add-thread").post(protect, addThreadToCollection); 

module.exports = router;
