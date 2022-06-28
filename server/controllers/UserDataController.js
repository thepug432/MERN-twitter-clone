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

const update = asyncHandler(async (req,res) => {
    const check = await User.findOne({username: req.body.username})
    if (check !== null && req.body.username !== req.user.username) {
        res.status(401).json({msg: 'Username is taken'})
    }
    const response = await User.findByIdAndUpdate(req.user.id, {
        username: req.body.username,
        description: req.body.description,
    })
    res.status(200).json({msg: 'Success'})
})

const follow = asyncHandler(async(req,res) => {
    const exists = await User.findOne({$and: [
        { _id: req.body.id},
        { followers: req.user.id}
    ]});
    if (exists) {
        await User.findByIdAndUpdate(req.body.id, {$pull: {followers: req.user.id}})
    } else{
        await User.findByIdAndUpdate(req.body.id, {$addToSet: {followers: req.user.id}})
    }
    res.status(200).json({ msg: 'followed'})
})

module.exports = {
    getUserdata,
    top,
    getbyquery,
    update,
    follow
}