const { Router } = require('express');

const postController = require('../controllers/postController');
const { isAuthenticated } = require('../middlewares/auth');

const router = Router();

router.use(isAuthenticated);

router.get('/', postController.getAllPosts);

router.get('/me', postController.getUserPosts);
router.get('/:userId', postController.getUserPosts);

router.post('/', postController.createPost);
router.delete('/:postId', postController.deletePost);
router.put('/:postId', postController.updatePost);

module.exports = router;
