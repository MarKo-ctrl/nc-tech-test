const express = require('express');
const {
  getCardsList
} = require('./controllers/cards.controllers')
const {
  handleInvalidRoutes
} = require('./controllers/errors/errors.controllers');

const app = express();

app.set('json spaces', 2);

app.get('/cards', getCardsList);


app.all('/*', handleInvalidRoutes);

module.exports = app;