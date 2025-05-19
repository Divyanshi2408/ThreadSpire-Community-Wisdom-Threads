const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;  // Ensure 'name' is being destructured
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });  
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name, 
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,  
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const followUser = async (req, res) => {
  const userId = req.user.id;
  const targetId = req.params.id;

  if (userId === targetId) {
    return res.status(400).json({ message: "You can't follow yourself." });
  }

  const user = await User.findById(userId);
  const targetUser = await User.findById(targetId);

  if (!user || !targetUser) return res.status(404).json({ message: "User not found." });

  if (!user.following.includes(targetId)) {
    user.following.push(targetId);
    targetUser.followers.push(userId);
    await user.save();
    await targetUser.save();
  }

  res.status(200).json({ message: "User followed successfully." });
};

const unfollowUser = async (req, res) => {
  const userId = req.user.id;
  const targetId = req.params.id;

  const user = await User.findById(userId);
  const targetUser = await User.findById(targetId);

  if (!user || !targetUser) return res.status(404).json({ message: "User not found." });

  user.following = user.following.filter(id => id.toString() !== targetId);
  targetUser.followers = targetUser.followers.filter(id => id.toString() !== userId);

  await user.save();
  await targetUser.save();

  res.status(200).json({ message: "User unfollowed successfully." });
};

const getFollowers = async (req, res) => {
  const user = await User.findById(req.params.id).populate("followers", "name email");
  if (!user) return res.status(404).json({ message: "User not found." });

  res.json(user.followers);
};

const getFollowing = async (req, res) => {
  const user = await User.findById(req.params.id).populate("following", "name email");
  if (!user) return res.status(404).json({ message: "User not found." });

  res.json(user.following);
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found." });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { register, login, followUser, unfollowUser, getFollowers, getFollowing, getUserById };
