const express = require('express');
const router = express.Router()
const {createComment } = require('../controllers/CommentsController')
const {protect} = require('../middleware/authMiddleware')

router.post('/create', protect, createComment)

module.exports = router