const express = require("express");
const router = express.Router();
const {
  createThread,
  getThreads,
  getMyThreads,
  reactThread,
  forkThread,
  getTrendingThreads,
} = require("../controllers/threadController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(getThreads).post(protect, createThread);
router.route("/mine").get(protect, getMyThreads);
router.route("/:id/react").post(protect, reactThread);
router.route("/:id/fork").post(protect, forkThread);
router.route("/trending").get(protect, getTrendingThreads);

module.exports = router;