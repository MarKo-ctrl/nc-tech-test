const {
  fetchCardsList,
  fetchCard
} = require('../models/cards.models');


exports.getCardsList = (req, res, next) => {
  fetchCardsList()
    .then((cardsList) => {
      res.status(200).send(cardsList)
    })
    .catch(next)
};

exports.getCardById = (req, res, next) => {
  const { cardId } = req.params;
  fetchCard(cardId)
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(next);
};