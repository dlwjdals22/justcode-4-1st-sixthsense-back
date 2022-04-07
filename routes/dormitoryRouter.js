const express = require("express");
const router = express.Router();

const dormitoryController = require("../controllers/dormitoryController");

router.get("/", dormitoryController.dormitories);
router.get("/images", dormitoryController.dormitoriesImage);
router.get("/cities", dormitoryController.cities);
router.get("/search", dormitoryController.getSearchedDormitories);
router.get("/:id", dormitoryController.detail);

module.exports = router;
