const { Router } = require('express');

const router = Router();

const likeController = require('../controllers/likeController');

// Path: /posts

router.get('/:postId/likes', likeController.getPostLikes); // Get post likes

router.post('/:postId/likes', likeController.toggleLikePost); // like/unlike post

module.exports = router;
