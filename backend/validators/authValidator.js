const { body } = require('express-validator');

registerValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage(`Password must be at least 6 characters`),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),

  body('firstName')
    .trim()
    .isAlpha()
    .withMessage('First name must only contain letters')
    .notEmpty()
    .withMessage('First name is required')
    .escape(),

  body('lastName')
    .trim()
    .isAlpha()
    .withMessage('Last name must only contain letters')
    .notEmpty()
    .withMessage('Last name is required')
    .escape(),
];

module.exports = { registerValidation };
