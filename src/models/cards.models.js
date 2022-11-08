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


exports.fetchCard = (id) => {
  const card = {
    title: '',
    imageUrl: '',
    card_id: '',
    base_price: '',
    availableSizes: [],
    pages: []
  };

  return fs.readFile('src/data/cards.json', 'utf-8')
    .then((cardsData) => {
      const cardsArr = JSON.parse(cardsData);

      if (parseInt(id.substring(4)) > cardsArr.length) {
        return Promise.reject({
          status: 404,
          msg: 'Card not found'
        });
      } else {
        const cardIndex = cardsArr.findIndex(card => card.id === id)
        // the requested card
        const cardObj = cardsArr[cardIndex];
  
        card.title = cardObj.title;
        card.card_id = cardObj.id;
        card.base_price = cardObj.basePrice;
        card.pages = cardObj.pages;
  
        return fs.readFile('src/data/templates.json', 'utf-8')
          .then((templates) => {
            const templatesArr = JSON.parse(templates);
            const imageUrlIndex = templatesArr.findIndex(template => cardObj.pages[0].templateId === template.id);
            card.imageUrl = templatesArr[imageUrlIndex].imageUrl;
  
            return fs.readFile('src/data/sizes-m.json', 'utf-8')
              .then((sizes) => {
                const sizeArr = JSON.parse(sizes)
  
                for (let cardSize of cardObj.sizes) {
                  for (let size of sizeArr) {
                    if (cardSize === size.id) {
                      card.availableSizes.push(size)
                    }
                  }
                }
                return card;
              })
          })
      }
    })
}