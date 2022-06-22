const asyncHandler = require('express-async-handler');
const Posts = require('../model/postsModel')


//get
const getPosts = asyncHandler(async (req, res) => {
    let posts = await Posts.find().sort('-createdAt').populate('poster', 'username');
    if (posts.length === 0) {
        posts = ''
    }
    res.status(200).json(posts)
})

const likedPosts = asyncHandler(async(req, res) => {
    let posts = await Posts.find( {likes: req.user.id} ).sort('-createdAt').populate('poster', 'username')
    const count = posts.length
    if (count === 0) {
        posts = ''
    }
    res.status(200).json({
        posts: posts,
        count: count
    })
})

const postbyid = asyncHandler(async(req,res) => {
    let post = await Posts.findById(req.query.id).populate('poster', 'username');
    if (post === null) {
        post = ''
    }
    res.status(200).json(post)
})

//post
const createPost = asyncHandler(async (req, res) => {
    if (!req.body.text || req.body.text === ''){
        res.status(400)
        throw new Error('Please add text field')
    }
    const post = Posts.create({
        text: req.body.text,
        poster: req.user.id,
        likes: []
    })
    res.status(200).json(post)
})

// put
const likePost = asyncHandler(async (req, res) => {
    const likerId = req.user.id
    const postId = req.body.id
    await Posts.findByIdAndUpdate(postId, {$addToSet: {likes: likerId}})
    res.status(200).json({status: true})
})

const unlikePost = asyncHandler(async (req, res) => {
    const likerId = req.user.id
    const postId = req.body.id
    await Posts.findByIdAndUpdate(postId, {$pull: {likes: likerId}})
    res.status(200).json({status: true})
})

module.exports = {
    getPosts, 
    likedPosts,
    postbyid,
    createPost,
    likePost,
    unlikePost,
}