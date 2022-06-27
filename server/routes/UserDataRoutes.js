const express = require('express');
const router = express.Router()
const { getUserdata, top, getbyquery, update } = require('../controllers/UserDataController')
const {protect} = require('../middleware/authMiddleware')

router.get('/usernameFromId', getUserdata)
router.get('/top', top)
router.get('/getbyquery', getbyquery)

router.post('/update', protect, update)

module.exports = router