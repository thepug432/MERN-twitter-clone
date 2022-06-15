const asyncHandler = require('express-async-handler')
const Posts = require('../model/postsModel')

const getPosts = asyncHandler(async (req, res) => {
    const posts = await Posts.find()
    console.log('ran');
    res.status(200).json(posts)
})

const createPost = asyncHandler(async (req, res) => {
    console.log('ran');
    if (req.body.text){
        res.status(400)
        throw new Error('Please add text field')
    }
    
    const goal = await Posts.create({
        text: req.body.text
    })

    res.status(200).json(goal)
})

module.exports = {
    getPosts, createPost
}