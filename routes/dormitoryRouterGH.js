const express = require("express");
const router = express.Router();

const dormitoryController = require("../controllers/dormitoryControllerGH");

router.get("/images", dormitoryController.dormitoriesImage);
router.get("/", dormitoryController.dormitories);
router.get("/cities", dormitoryController.cities);

module.exports = router;
