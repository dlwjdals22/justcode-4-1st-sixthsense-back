const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const dormitoryRouter = require("./dormitoryRouter");
const room = require("./roomsRouter");

router.use("/dormitories", dormitoryRouter);
router.use("/rooms", room);
router.use("/users", userRoute);

module.exports = router;
