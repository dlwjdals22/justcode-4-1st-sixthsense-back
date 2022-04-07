const express = require('express')
const router = express.Router()

const dormListController = require('../controllers/dormListControllerHN')

router.get('/searched', dormListController.getSearchedDormitories)

module.exports = router