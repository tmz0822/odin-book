const { Router } = require('express');

const authController = require('../controllers/authController');
const passport = require('passport');
const { isAuthenticated } = require('../middlewares/auth');
const { registerValidation } = require('../validators/authValidator');

const router = Router();

router.post('/signup', registerValidation, authController.signup);
router.post('/login', authController.login);

router.post('/logout', isAuthenticated, authController.logout);

module.exports = router;
