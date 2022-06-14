const userRoutes = require('express').Router();
const { getUserInfo, patchUserInfo } = require('../controllers/users');

userRoutes.get('/me', getUserInfo);
userRoutes.patch('/me', patchUserInfo);

module.exports = userRoutes;
