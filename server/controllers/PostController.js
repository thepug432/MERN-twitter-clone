const asyncHandler = require('express-async-handler');
const Posts = require('../model/postsModel')

const getPosts = asyncHandler(async (req, res) => {
    let posts = await Posts.find().sort('-createdAt').populate('poster', 'username');
    if (posts.length === 0) {
        posts = ''
    }
    res.status(200).json(posts)
})

const createPost = asyncHandler(async (req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add text field')
    }
    const goal = await Posts.create({
        text: req.body.text,
        poster: req.user.id
    })

    res.status(200).json(goal)
})

const likePost = asyncHandler(async (req, res) => {
    const likerId = req.user.id
    const postId = req.body.id
    const post = await Posts.findById(postId)
    console.log(post.likes);
    res.status(200)
})

module.exports = {
    getPosts, 
    createPost,
    likePost
}