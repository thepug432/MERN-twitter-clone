const asyncHandler = require('express-async-handler')
const Posts = require('../model/postsModel')

const getPosts = asyncHandler(async (req, res) => {
    let posts = await Posts.find()
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

module.exports = {
    getPosts, createPost
}