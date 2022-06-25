const express = require('express');
const router = express.Router()
const { getUsername, top } = require('../controllers/UserDataController')
const {protect} = require('../middleware/authMiddleware')

router.get('/usernameFromId', getUsername)
router.get('/top', top)

module.exports = router