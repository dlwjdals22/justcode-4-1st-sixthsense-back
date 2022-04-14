const express = require('express');

const userController = require('../controllers/userController');
// const { validateToken } = require('../middleware/authorization');

const router = express.Router();

router.post('/login', userController.logIn);
router.post('/signup', userController.signUp);
// router.post('/heart', userController.isLike);
// router.get('/heart', userController.showLike);

module.exports = router;
