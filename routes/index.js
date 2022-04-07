const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const dormitoryRouter = require("./dormitoryRouterGH");
const room = require("./roomsRouter");
const detailRouter = require("./detailRouter");

router.use("/dormitories", dormitoryRouter);
router.use("/rooms", room);
router.use("/users", userRoute);
router.use("/detail", detailRouter);

module.exports = router;
