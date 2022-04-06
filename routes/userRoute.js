const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/login", userController.logIn)
router.post('/signup', userController.validateForm, userController.signUp);
router.get('/is-like', userController.isLike);


module.exports = router;
