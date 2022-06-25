const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const getUsername = asyncHandler(async (req, res) => {
    const response = await User.findById(req.query.id).select('-password -__v -updatedAt')
    res.status(200).json(response)
})

const top = asyncHandler(async (req, res) => {
    const response = await User.find().sort('followers').limit(req.query.num).select('-password -__v -updatedAt')
    res.status(200).json(response)
})

module.exports = {
    getUsername,
    top
}