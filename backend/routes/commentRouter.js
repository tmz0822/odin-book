const { Router } = require('express');

const router = Router();

const commentController = require('../controllers/commentController');

// add comment
router.post('/:postId/comments', commentController.addComment);

module.exports = router;
