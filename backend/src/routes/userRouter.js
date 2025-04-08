const { Router } = require('express');
const { isAuthenticated } = require('../middlewares/auth');

const router = Router();

const userController = require('../controllers/userController');

// users/
router.use(isAuthenticated);
router.get('/me', userController.getCurrentUser);
router.get('/', userController.getAllUsers);

router.get('/:userId/posts', userController.getUserPosts);

router.get('/:userId', userController.getUserById);

module.exports = router;
