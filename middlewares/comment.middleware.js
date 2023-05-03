const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Comment = require('../models/comment.model');

exports.validIfExistComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!comment) next(new AppError('Comment not found', 404));

  req.comment = comment;

  next();
});
