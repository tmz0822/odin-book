const Post = require('../models/Post');

const toggleLikePost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  try {
    const { liked, updatedPost } = await Post.togglePostLike(userId, postId);

    res.status(201).json({ success: true, liked, post: updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPostLikes = (req, res) => {};

module.exports = { toggleLikePost, getPostLikes };
