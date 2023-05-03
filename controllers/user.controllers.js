const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const { ref, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');

const findAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'active',
    },
    attributes: { exclude: ['password', 'passwordChangedAt', 'status'] },
    include: [
      {
        model: Post,
        include: [
          {
            model: Comment,
          },
        ],
      },
    ],
  });

  const userPromises = users.map(async (user) => {
    const imgRef = ref(storage, user.profileImgUrl);
    const url = await getDownloadURL(imgRef);

    user.profileImgUrl = url;
    return user;
  });

  const userResolved = await Promise.all(userPromises);

  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

const findOneUser = catchAsync(async (req, res) => {
  const { user } = req;

  const imgRef = ref(storage, user.profileImgUrl);
  const url = await getDownloadURL(imgRef);

  user.profileImgUrl = url;

  return res.status(200).json({
    status: 'success',
    message: 'User found',
    user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({
    status: 'disabled',
    message: 'The user has been disabled',
  });

  res.status(200).json({
    status: 'success',
  });

  res.status(500).json({
    status: 'fail',
    message: 'Something went very wrong',
  });
});

module.exports = {
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser,
};
