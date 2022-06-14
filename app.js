const express = require('express');
const mongoose = require('mongoose');
// const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const { auth } = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createError } = require('./errors/createError');

const app = express();

app.use(requestLogger);
app.use(express.json());
app.post('/signup', createUser);
app.post('/signin', login);
app.use('/users', auth, userRoutes);
app.use('/movies', auth, movieRoutes);

app.use(auth, () => {
  throw new NotFoundError('Неверный адрес');
});

app.use(errorLogger);
app.use(errors());
app.use(createError);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  app.listen(PORT);
}

main();
