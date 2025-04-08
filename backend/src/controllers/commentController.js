const Comment = require('../models/Comment');

const addComment = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  const content = req.body.content;

  if (!content || content.trim() === '') {
    return res.json({ success: false, message: 'Content cannot be empty' });
  }

  try {
    const addedComment = await Comment.createComment(userId, postId, content);

    res.json({ success: true, comment: addedComment });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = { addComment };
