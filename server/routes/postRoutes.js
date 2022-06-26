const express = require('express');
const router = express.Router()
const {getPosts, createPost, likePost, unlikePost, likedPosts, postbyid , postByPoster, top, getbyquery} = require('../controllers/PostController')
const {protect} = require('../middleware/authMiddleware')


//get 
router.get('/allposts', getPosts)
router.get('/likedposts', protect, likedPosts)
router.get('/postbyid', postbyid)
router.get('/postbyposter', postByPoster)
router.get('/top', top)
router.get('/getbyquery', getbyquery)

// post
router.post('/create', protect, createPost)

//put
router.put('/like', protect, likePost)
router.put('/unlike', protect, unlikePost)

module.exports = router