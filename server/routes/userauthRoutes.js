const express = require('express');
const router = express.Router()
const { register, login, getdata, getUsername } = require('../controllers/UserauthController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', register)
router.post('/login', login)
router.get('/me', protect, getdata)

module.exports = router