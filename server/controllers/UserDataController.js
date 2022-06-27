const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const getUserdata = asyncHandler(async (req, res) => {
    const response = await User.findById(req.query.id).select('-password -__v -updatedAt')
    res.status(200).json(response)
})

const top = asyncHandler(async (req, res) => {
    const response = await User.find().sort('followers').limit(req.query.num).select('-password -__v -updatedAt')
    res.status(200).json(response)
})

const getbyquery = asyncHandler(async (req, res) => {
    const StringReg = `.*${req.query.query}.*`
    const re = new RegExp(StringReg, 'i')
    let response = await User.find({ username: { $regex : re} }).sort('followers').select('-password -__v -updatedAt')
    if (response.length === 0) {
        response = ''
    }
    res.status(200).json(response)
})

module.exports = {
    getUserdata,
    top,
    getbyquery
}