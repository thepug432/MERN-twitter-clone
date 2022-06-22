const express = require('express');
const router = express.Router()
const {createComment, getComment} = require('../controllers/CommentsController')
const {protect} = require('../middleware/authMiddleware')

router.post('/create', protect, createComment)

router.get('/commentsbyid', getComment)

module.exports = router