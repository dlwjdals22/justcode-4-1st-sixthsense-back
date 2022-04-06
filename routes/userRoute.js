const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/signup", userController.validateForm, userController.signUp);
router.post("/login", userController.logIn);

module.exports = router;
