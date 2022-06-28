const express = require('express');
const router = express.Router()
const { getUserdata, top, getbyquery, update, follow } = require('../controllers/UserDataController')
const {protect} = require('../middleware/authMiddleware')

router.get('/userbyId', getUserdata)
router.get('/top', top)
router.get('/getbyquery', getbyquery)

router.post('/update', protect, update)

router.put('/follow', protect, follow)

module.exports = router