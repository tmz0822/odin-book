const { Router } = require('express');
const { isAuthenticated } = require('../middlewares/auth');

const router = Router();

const userController = require('../controllers/userController');

router.get('/me', isAuthenticated, userController.getCurrentUser);

router.get('/:userId/posts', userController.getUserPosts);

router.get('/:userId', userController.getUserById);

module.exports = router;
