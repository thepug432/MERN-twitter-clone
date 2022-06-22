const asyncHandler = require('express-async-handler');
const Comment = require('../model/commentModel')

const createComment = asyncHandler(async(req,res) => {
    res.status(200).json({msg: 'done'})
})

module.exports = {
    createComment
}