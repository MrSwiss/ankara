'use strict';

const api = module.exports = require('express').Router();

api
  .use('/location', require('./location.js'))
  .use('/game', require('./game.js'))
  .use('/ability', require('./ability.js'))
  .use('/action', require('./action.js'))
  .use('/card', require('./card.js'))
  .use('/pay', require('./pay.js'))
  .use('/move', require('./move.js'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())