const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const strategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findByUsername(username); // grab user from db

    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(strategy);

module.exports = passport;
