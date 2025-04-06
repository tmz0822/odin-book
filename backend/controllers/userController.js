const User = require('../models/User');
const Post = require('../models/Post');

const getCurrentUser = (req, res) => {
  try {
    // Remove sensitive data from user
    const { password, ...user } = req.user;

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ success: false, message: 'Error getting user' });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    res.json({ success: true, user });
  } catch (error) {
    console.error('Error get user by id:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUserPosts = async (req, res) => {
  const userId = req.params.userId || req.user.id;

  try {
    const posts = await Post.findPostsByUserId(userId);

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch user posts' });
  }
};

module.exports = {
  getCurrentUser,
  getUserById,
  getUserPosts,
  getUserPosts,
};
