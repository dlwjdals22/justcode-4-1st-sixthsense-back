const express = require('express');
const router = express.Router();

const userRoute = require('./userRoute');
const dormListRoute = require('./dormListRouteHN');
router.use('/users', userRoute);
router.use('/dormList', dormListRoute);

module.exports = router;
