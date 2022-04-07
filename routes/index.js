const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const dormitoryRouter = require("./dormitoryRouterGH");
const dormListRoute = require('./dormListRouteHN');
const room = require("./roomsRouter");
const detailRouter = require("./detailRouter");

router.use("/dormitories", dormitoryRouter);
router.use("/rooms", room);
router.use("/users", userRoute);
router.use("/detail", detailRouter);
router.use('/dormList', dormListRoute);



module.exports = router;
