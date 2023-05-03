const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');
const commentRouter = require('./routes/comment.routes');
const AppError = require('./utils/appError');
const globlarErrorHandler = require('./controllers/error.controllers');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const helmet = require('helmet');
const hpp = require('hpp');

const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in one hour',
});

app.use(helmet());
app.use(express.json());
app.use(xss());
app.use(hpp());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1', limiter);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server! 🧨`, 404));
});

app.use(globlarErrorHandler);

//rutas

module.exports = app;
