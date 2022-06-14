const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createError } = require('./errors/createError');
const { limiter } = require('./utils/rateLimit');

const app = express();

app.use(helmet.hidePoweredBy());
app.use(limiter);
app.use(requestLogger);
app.use(express.json());
app.use('/', routes);

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
