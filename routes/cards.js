const express = require('express');
const router = express.Router()

const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
  const cardId = Math.floor(Math.random() * cards.length);
  res.redirect(`/cards/${cardId}`);
})


router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params; //randomId

  if ( !side ) {
    return res.redirect(`/cards/${id}?side=question`);
  }

  const name = req.cookies.username;
  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { id, text, name };

  if (side === 'question') {
    templateData.flip = 'answer';
    templateData.backto = 'Answer';
    templateData.hint = hint;
  } else if (side === 'answer') {
    templateData.flip = 'question';
    templateData.backto = 'Question';
  };


  res.render('card', templateData);
});

module.exports = router;
