const cardsRouter = require('express').Router();
const {
  createCard,
  getAllCards,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

const {
  postCardValidation,
  deleteCardValidation,
  putLikeValidation,
  deleteLikeValidation,
} = require('../utils/requestValidation');

cardsRouter.post('/', postCardValidation, createCard);
cardsRouter.get('/', getAllCards);
cardsRouter.delete('/:cardId', deleteCardValidation, deleteCard);
cardsRouter.put('/:cardId/likes', putLikeValidation, putLike);
cardsRouter.delete('/:cardId/likes', deleteLikeValidation, deleteLike);

module.exports = cardsRouter;
