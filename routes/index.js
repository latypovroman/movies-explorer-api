const routes = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { auth } = require('../middlewares/auth');
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

routes.use('/users', auth, userRoutes);
routes.use('/movies', auth, movieRoutes);

routes.use(auth, () => {
  throw new NotFoundError('Неверный адрес');
});

module.exports = routes;
