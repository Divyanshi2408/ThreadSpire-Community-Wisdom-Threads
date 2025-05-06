const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { register, login,followUser, unfollowUser, getFollowers, getFollowing, getUserById } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/follow/:id", protect, followUser);
router.post("/unfollow/:id", protect, unfollowUser);
router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);
router.get("/:id", getUserById);
module.exports = router;