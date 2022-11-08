const express = require('express');
const {
  getCardsList,
  getCardById
} = require('./controllers/cards.controllers')
const {
  handleInvalidRoutes,
  handleCustomErrors
} = require('./controllers/errors/errors.controllers');

const app = express();

app.set('json spaces', 2);

app.get('/cards', getCardsList);
app.get('/cards/:cardId', getCardById);

app.all('/*', handleInvalidRoutes);
app.use(handleCustomErrors);


module.exports = app;