const express = require("express");
const router = express.Router();
const {
  createThread,
  getThreads,
  getMyThreads,
  getThreadsByTag,
  getAllTagsWithCount,
  reactThread,
  forkThread,
  getTrendingThreads,
  updateThread,
  deleteThread,
} = require("../controllers/threadController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(getThreads).post(protect, createThread);
router.route("/mine").get(protect, getMyThreads);
router.route("/tags/:tagName").get(protect, getThreadsByTag);
router.route("/tags").get(protect, getAllTagsWithCount);
router.route("/:id/react").post(protect, reactThread);
router.route("/:id/fork").post(protect, forkThread);
router.route("/trending").get(protect, getTrendingThreads);
router.route("/:id").put(protect, updateThread);
router.route("/:id").delete(protect, deleteThread);

module.exports = router;