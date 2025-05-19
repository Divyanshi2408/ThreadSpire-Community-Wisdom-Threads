const express = require("express");
const router = express.Router();
const {
  createThread,
  getThreads,
  getMyThreads,
  getThreadById,
  getThreadsByTag,
  getAllTagsWithCount,
  reactThread,
  forkThread,
  getTrendingThreads,
  updateThread,
  deleteThread,
  getThreadsByUser,
  addCommentToThread, 
  getThreadComments,
} = require("../controllers/threadController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(getThreads).post(protect, createThread);
router.route("/mine").get(protect, getMyThreads);
router.route("/tags/:tagName").get(protect, getThreadsByTag);
router.route("/tags").get(protect, getAllTagsWithCount);
router.route("/:id/react").post(protect, reactThread);
router.route("/:id/comments")
  .get(getThreadComments)
  .post(protect, addCommentToThread);

router.route("/:id/fork").post(protect, forkThread);
router.route("/trending").get(protect, getTrendingThreads);
router.route("/:id").put(protect, updateThread);
router.route("/:id").delete(protect, deleteThread);
router.route("/:id").get(protect, getThreadById);
router.route("/user/:id").get(protect, getThreadsByUser);

module.exports = router;
