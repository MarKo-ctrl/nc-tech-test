const request = require('supertest');
const app = require('../server');

describe('GET /cards', () => {
  test('200: should respond with a list of cards', () => {
    return request(app)
      .get('/cards')
      .expect(200)
      .then((cards) => {
        const cardsList = JSON.parse(cards.text);

        expect(cardsList).toBeInstanceOf(Array);
        cardsList.forEach((card) => {
          expect(card).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              imageUrl: expect.any(String),
              card_id: expect.any(String)
            })
          )
        });
      });
  });

  test('404: should respond with an error message if the route does not exist', () => {
    return request(app)
      .get('/manyCards')
      .expect(404)
      .then((errMsg) => {
        expect(JSON.parse(errMsg.text)).toEqual({ message: 'Route not found' });
      })
  });
});

describe('GET /cards/:cardId', () => {
  test('200: should respond with a single card', () => {
    const cardId = 'card003';

    return request(app)
      .get(`/cards/${cardId}`)
      .expect(200)
      .then((card) => {
        const cardObj = JSON.parse(card.text);

        expect(cardObj).toBeInstanceOf(Object);
        expect(cardObj).toEqual(
          expect.objectContaining({
            title: "card 3 title",
            imageUrl: "/front-cover-landscape.jpg",
            card_id: "card003",
            base_price: 200,
            availableSizes: [{
              id: "md",
              title: "Medium"
            },
            {
              id: "lg",
              title: "Large"
            }],
            pages: [
              {
                title: "Front Cover",
                templateId: "template006"
              },
              {
                title: "Inside Top",
                templateId: "template007"
              },
              {
                title: "Inside Bottom", 
                templateId: "template007"
              },
              {
                title: "Back Cover",
                templateId: "template008"
              }
            ]
          })
        );
      });
  });

  test(`404: responds with an error message when passed a cardId that does not exist`, () => {
    const cardId = 'card013';
    return request(app)
      .get(`/cards/${cardId}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Card not found');
      });
  });
});