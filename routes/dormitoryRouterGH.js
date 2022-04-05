const express = require("express");
const router = express.Router();

const dormitoryController = require("../controllers/dormitoryControllerGH");

router.get("/images", dormitoryController.dormitoriesImage);
router.get("/slide", dormitoryController.slide); //나중에 api 주소 바꿔야할 것 같아요. 일단 겹칠 거 같아서 프론트 기준으로 썼습니다.

module.exports = router;
