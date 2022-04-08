const express = require('express');

const userController = require('../controllers/userController');
const { validateToken } = require('../middleware/authorization');

const router = express.Router();

router.post('/login', userController.logIn);
router.post('/signup', userController.signUp);
router.get('/test', validateToken, userController.test);
router.post('/heart', validateToken, userController.isLike);
router.get('/heart', validateToken, userController.showLike);

module.exports = router;
