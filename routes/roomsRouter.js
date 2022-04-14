const express = require("express");
const router = express.Router();

const roomController = require("../controllers/roomController");

router.get("/images", roomController.roomsImage);
// router.get("/:id", roomController.)

module.exports = router;
