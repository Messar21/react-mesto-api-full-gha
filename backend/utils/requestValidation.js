const { celebrate, Joi } = require('celebrate');
const { RegExpUrl } = require('./RegExpUrl');

const getUserValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().allow('me').hex()
      .length(24),
  }),
});

const patchUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const patchAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(RegExpUrl),
  }),
});

const postCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(RegExpUrl),
  }),
});

const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

const putLikeValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

const deleteLikeValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const registrationValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(RegExpUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  getUserValidation,
  patchUserValidation,
  patchAvatarValidation,
  postCardValidation,
  deleteCardValidation,
  putLikeValidation,
  deleteLikeValidation,
  loginValidation,
  registrationValidation,
};
