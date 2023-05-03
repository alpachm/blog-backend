const express = require('express');
const { signup, login, renew } = require('../controllers/auth.controllers');
const validation = require('../middlewares/validations.middleware');
const { protect } = require('../middlewares/auth.middleware');
const { upload } = require('../utils/multer');

const router = express.Router();

router
  .route('/signup')
  .post(
    upload.single('profileImgUrl'),
    validation.createUserValidation,
    signup
  );

router.post('/login', validation.loginUserValidation, login);

router.use(protect);

router.get('/renew', renew);

module.exports = router;
