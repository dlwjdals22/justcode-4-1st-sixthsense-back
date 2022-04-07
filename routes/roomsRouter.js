const express = require("express");
const router = express.Router();

const roomController = require("../controllers/roomController");

router.get("/images", roomController.roomsImage);

module.exports = router;
