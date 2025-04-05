const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('../config/passport');

const signup = async (req, res) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;

    if (!email || !username || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const emailExists = await User.findByEmail(email);
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    const usernameExists = await User.findByUsername(username);
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

const logout = async (req, res) => {};

module.exports = { signup, login };
