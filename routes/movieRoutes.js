const movieRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validation } = require('../utils/urlValidate');

movieRoutes.get('/', getMovies);

movieRoutes.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validation),
    trailerLink: Joi.string().required().custom(validation),
    thumbnail: Joi.string().required().custom(validation),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

movieRoutes.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovie);

module.exports = movieRoutes;
