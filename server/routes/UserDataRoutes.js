const express = require('express');
const router = express.Router()
const { getUsername } = require('../controllers/UserDataController')
const {protect} = require('../middleware/authMiddleware')

router.get('/usernameFromId', getUsername)

module.exports = router