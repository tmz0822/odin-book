const Comment = require('../models/Comment');

const addComment = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.json({ success: false, message: 'Content cannot be empty' });
  }

  try {
    const commentData = { content };
    const addedComment = await Comment.createComment(
      userId,
      postId,
      commentData
    );

    res.json({ success: true, comment: addedComment });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const getPostComments = async (req, res) => {
  const { postId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  console.log(page);

  try {
    const { comments, total } = await Comment.findPostComments(
      postId,
      page,
      limit
    );

    res.json({
      data: comments,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

module.exports = { addComment, getPostComments };
