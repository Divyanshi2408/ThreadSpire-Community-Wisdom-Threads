const express = require("express");
const router = express.Router();
const {
  createThread,
  getThreads,
  reactThread,
  forkThread
} = require("../controllers/threadController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(getThreads).post(protect, createThread);
router.route("/:id/react").post(protect, reactThread);
router.route("/:id/fork").post(protect, forkThread);

module.exports = router;