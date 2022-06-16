const express = require('express');
const router = express.Router()
const {getPosts, createPost} = require('../controllers/PostController')
const {protect} = require('../middleware/authMiddleware')


router.get('/', getPosts)
router.post('/create', protect, createPost)

module.exports = router