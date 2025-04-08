const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('../config/passport');
const { validationResult } = require('express-validator');

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, username, password, firstName, lastName } = req.body;

    const [emailExists, usernameExists] = await Promise.all([
      User.findByEmail(email),
      User.findByUsername(username),
    ]);

    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    if (usernameExists) {
      return res.status(409).json({
        success: false,
        message: 'Username already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
    };

    const createdUser = await User.createUser(userData);

    res.status(201).json({ success: true, user: createdUser });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
};

const login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message || 'Authentication failed',
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ success: true, user });
    });
  })(req, res, next);
};

const logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to log out',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  });
};

module.exports = { signup, login, logout };
