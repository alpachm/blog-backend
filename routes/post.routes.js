const express = require('express');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const {
  createPost,
  deletePost,
  findAllPost,
  findMyPost,
  findOnePost,
  findUserPost,
  updatePost,
} = require('../controllers/post.controller');
const {
  createPostValidation,
} = require('../middlewares/validations.middleware');
const { validIfExistUser } = require('../middlewares/user.middleware');
const {
  validIfExistPost,
  existsPostForFoundIt,
} = require('../middlewares/post.middleware');
const { upload } = require('../utils/multer');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(findAllPost)
  .post(upload.array('postImgs', 3), createPostValidation, createPost);

router.get('/me', findMyPost);

router.get('/profile/:id', validIfExistUser, findUserPost);

router
  .route('/:id')
  .get(existsPostForFoundIt, findOnePost)
  .patch(
    createPostValidation,
    validIfExistPost,
    protectAccountOwner,
    updatePost
  )
  .delete(validIfExistPost, protectAccountOwner, deletePost);

module.exports = router;
