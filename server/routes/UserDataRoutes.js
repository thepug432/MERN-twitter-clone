const express = require('express');
const router = express.Router()
const { getUsername, top, getbyquery } = require('../controllers/UserDataController')
const {protect} = require('../middleware/authMiddleware')

router.get('/usernameFromId', getUsername)
router.get('/top', top)
router.get('/getbyquery', getbyquery)

module.exports = router