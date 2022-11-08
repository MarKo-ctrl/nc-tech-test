const request = require('supertest');
const app = require('../server');

describe('GET /cards', () => {
  test.only('200: should respond with a list of cards', () => {
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