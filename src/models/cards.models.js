const fs = require('fs/promises');

exports.fetchCardsList = () => {
  const resCards = [];

  return fs.readFile('src/data/cards.json', 'utf-8')
    .then((cards) => {
      const cardsArr = JSON.parse(cards);

      return fs.readFile('src/data/templates.json')
        .then((templates) => {
          const templatesArr = JSON.parse(templates);

          cardsArr.forEach(card => {
            const imageUrlIndex = templatesArr.findIndex(template => card.pages[0].templateId === template.id);
            resCards.push({ card_id: card.id, title: card.title, imageUrl: templatesArr[imageUrlIndex].imageUrl })
          });
          return resCards;
        });
    });
};