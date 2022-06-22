const asyncHandler = require('express-async-handler');
const Comment = require('../model/commentModel')

const createComment = asyncHandler(async(req,res) => {
    const user = req.user.id
    const post = req.body.id
    const content = req.body.content

    if (content === '') {
        res.status(400)
        throw new Error('No content')
    }
    const c = await Comment.create({
        commenter: user,
        post: post,
        text: content,
    })

    res.status(200).json({msg: true})
})

const getComment = asyncHandler(async(req,res) => {
    const id = req.query.id
    
    const comments = await Comment.find({post: id}).sort('-createdAt').populate('commenter', 'username');

    res.status(200).json(comments)
})

module.exports = {
    createComment,
    getComment
}