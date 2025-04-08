const Post = require('../models/Post');

const createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  if (!content || content.trim() === '') {
    throw new Error('Post content cannot be empty');
  }

  try {
    const postData = {
      content,
    };

    const createdPost = await Post.addPost(postData, userId);

    res.status(201).json({ success: true, post: createdPost });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Failed to create post' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cursor } = req.query;
    const limit = parseInt(req.query.limit) || 5;

    const posts = await Post.findAllPosts(cursor, limit, userId);
    const hasMore = posts.length > limit;
    if (hasMore) {
      // the posts returned are 6, we need to pop one off
      posts.pop();
    }

    const transformedPosts = posts.map((post) => ({
      ...post,
      isLiked: post.likes.length > 0,
      likeCount: post._count.likes,
      commentCount: post._count.comments,
    }));

    res.json({
      posts: transformedPosts,
      pagination: {
        nextCursor: posts.length > 0 ? posts[posts.length - 1].id : null,
        hasMore,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch posts',
      message: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const allowedFields = ['content'];

  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request body',
    });
  }

  // Filter the fields to only include allowed fields
  const updatedFields = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
  );

  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No valid fields provided for update',
    });
  }

  try {
    const updatedPost = await Post.updatePost(postId, userId, updatedFields);

    res.json({ success: true, post: updatedPost });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;

  try {
    const deletedPost = await Post.deletePost(postId, userId);

    res.json({ success: true, post: deletedPost });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
};
