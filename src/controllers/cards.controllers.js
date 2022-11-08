const {
  fetchCardsList
} = require('../models/cards.models');


exports.getCardsList = (req, res, next) => {
  fetchCardsList()
    .then((cardsList) => {
      res.status(200).send(cardsList)
    })
};