const express = require("express");
const router = express.Router();

const dormitoryRouter = require("./dormitoryRouterGH");
const room = require("./roomsRouter");

router.use("/dormitories", dormitoryRouter);
router.use("/rooms", room);

module.exports = router;
