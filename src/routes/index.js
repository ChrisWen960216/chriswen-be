const express = require('express');

const router = express.Router();

const SignController = require('../controller/sign');
const AuthCheck = require('../middleware/authCheck');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// router.get('/signout', AuthCheck.checkLogin, SignController.signOut);
router.get('/signout', AuthCheck.checkLogin, SignController.signOut);
module.exports = router;
