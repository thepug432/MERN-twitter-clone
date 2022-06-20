const express = require('express');
const router = express.Router()
const {getPosts, createPost, likePost} = require('../controllers/PostController')
const {protect} = require('../middleware/authMiddleware')


router.get('/allposts', getPosts)
router.post('/create', protect, createPost)
router.put('/like', protect, likePost)

module.exports = router