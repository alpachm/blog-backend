const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Comment = require('../models/comment.model');

exports.findAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.findAll({
    where: {
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'All comments was found',
    comments,
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const { text } = req.body;
  const { sessionUser } = req;
  const { postId } = req.params;

  const comment = await Comment.create({
    text,
    postId,
    userId: sessionUser.id,
  });

  res.status(200).json({
    status: 'success',
    message: 'Comment has been created',
    comment,
  });
});

exports.findCommentById = catchAsync(async (req, res, next) => {
  const { comment } = req;

  res.status(200).json({
    status: 'success',
    message: 'The comment was found',
    comment,
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const { text } = req.body;
  const { comment } = req;

  await comment.update({
    text,
  });

  res.status(200).json({
    status: 'sucess',
    message: 'The comment was update',
    comment,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const { comment } = req;

  await comment.update({
    status: 'disabled',
  });

  res.status(200).json({
    status: 'sucess',
    message: 'The comment was deleted',
    comment,
  });
});
