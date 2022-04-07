const express = require('express');

const userController = require('../controllers/userController');
const { validateToken } = require('../middleware/authorization');

const router = express.Router();

router.post('/login', userController.logIn);
router.post('/signup', userController.signUp);
router.get('/test', validateToken, userController.test);
// router.get('/is-like', validateToken, userController.isLike);

module.exports = router;
