const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('../config/passport');
const pgSession = require('connect-pg-simple')(session);

require('dotenv').config();

const authRouter = require('../routes/authRouter');
const userRouter = require('../routes/userRouter');
const postRouter = require('../routes/postRouter');
const followRouter = require('../routes/followRouter');
const likeRouter = require('../routes/likeRouter');

// Security Middlewares
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    store: new pgSession({
      conObject: {
        connectionString: process.env.DATABASE_URL,
      },
      tableName: 'session',
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || 'secretapple',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  })
);

// Passport
app.use(passport.session());

// Logging
app.use(morgan('dev'));

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/users', followRouter);
app.use('/posts', likeRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(process.env.PORT_NUMBER || '3000', () => {
  console.log(`app listening on PORT ${process.env.PORT_NUMBER || '3000'}`);
});
