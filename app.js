const express = require('express');
const mongoose = require('mongoose');
// const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const userRoutes = require('./routes/userRoutes');
const { auth } = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

const app = express();

app.use(express.json());
app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use('/users', userRoutes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  app.listen(PORT);
}

main();
