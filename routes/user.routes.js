const express = require('express');
const {
  findAllUsers,
  findOneUser,
  deleteUser,
  updateUser,
} = require('../controllers/user.controllers');
const { validIfExistUser } = require('../middlewares/user.middleware');
const {
  createUserValidation,
  updateUserValidation,
  updatedPasswordValidation,
} = require('../middlewares/validations.middleware');
const {
  protect,
  protectAccountOwner,
  restrictTo,
} = require('../middlewares/auth.middleware');
const { updatePassword } = require('../controllers/auth.controllers');

const router = express.Router();

router.use(protect);

router.route('/').get(findAllUsers).post();

router
  .route('/:id')
  .get(validIfExistUser, findOneUser)
  .patch(
    validIfExistUser,
    updateUserValidation,
    protectAccountOwner,
    updateUser
  )
  .delete(
    validIfExistUser,
    protectAccountOwner,
    restrictTo('admin', 'root'),
    deleteUser
  );

router.patch(
  '/password/:id',
  updatedPasswordValidation,
  validIfExistUser,
  protectAccountOwner,
  updatePassword
);

module.exports = router;
