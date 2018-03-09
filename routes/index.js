const express = require('express');

const router = express.Router();

const usersRouter = require('./users');

router.get('/', (request, response) => {
  response.send('Hello World');
});

router.use('/users', usersRouter);

module.exports = router;
