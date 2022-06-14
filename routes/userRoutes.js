const userRoutes = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getUserInfo, patchUserInfo } = require('../controllers/users');

userRoutes.get('/me', getUserInfo);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).max(30),
  }),
}), patchUserInfo);

module.exports = userRoutes;
