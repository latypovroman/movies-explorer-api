require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
// const cors = require('cors');

const { PORT = 3000 } = process.env;
const { DATAB_URL } = process.env;
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createError } = require('./errors/createError');
const { limiter } = require('./utils/rateLimit');

const app = express();

app.use(helmet.hidePoweredBy());
app.use(requestLogger);
app.use(limiter);
app.use(express.json());
// app.use(cors({
//   origin: 'https://mesto.app.nomoredomains.sbs',
// }));
app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(createError);

async function main() {
  await mongoose.connect(DATAB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  app.listen(PORT);
}

main();
