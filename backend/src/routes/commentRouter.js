const { Router } = require('express');

const router = Router();

const commentController = require('../controllers/commentController');

// add comment
router.post('/:postId/comments', commentController.addComment);

router.get('/:postId/comments', commentController.getPostComments);

module.exports = router;
