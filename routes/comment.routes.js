const express = require('express');
const {
  createComment,
  deleteComment,
  findAllComments,
  findCommentById,
  updateComment,
} = require('../controllers/comment.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validIfExistComment } = require('../middlewares/comment.middleware');
const {
  validContentComment,
} = require('../middlewares/validations.middleware');

const router = express.Router();

router.use(protect);

router.get('/', findAllComments);

router.post('/:postId', validContentComment, createComment);

router
  .use('/:id', validIfExistComment)
  .route('/:id')
  .get(findCommentById)
  .patch(validContentComment, updateComment)
  .delete(deleteComment);

module.exports = router;
