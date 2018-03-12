const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  response.redirect('/posts');
});

router.use('/signup', require('./signUp'));
router.use('/signin', require('./signIn'));
router.use('/signout', require('./signOut'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

module.exports = router;
