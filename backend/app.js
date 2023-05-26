require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const router = require('./routes');
const { handlerErrors } = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const {
  loginValidation,
  registrationValidation,
} = require('./utils/requestValidation');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/mestodb');

const app = express();

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger); // Лог запросов

app.post('/signin', loginValidation, login);
app.post('/signup', registrationValidation, createUser);
app.use(auth);
app.use('/', router);

app.use(errorLogger); // Логер ошибок

app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
});
