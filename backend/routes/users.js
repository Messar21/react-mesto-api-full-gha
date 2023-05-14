const userRouter = require('express').Router();
const {
  getUserValidation,
  patchUserValidation,
  patchAvatarValidation,
} = require('../utils/requestValidation');

const {
  getUser,
  getAllUsers,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/:userId', getUserValidation, getUser);
userRouter.get('/', getAllUsers);
userRouter.patch('/me', patchUserValidation, updateProfile);
userRouter.patch('/me/avatar', patchAvatarValidation, updateAvatar);

module.exports = userRouter;
