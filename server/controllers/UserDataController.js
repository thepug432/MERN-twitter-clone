const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const getUsername = asyncHandler(async (req, res) => {
    const {username} = await User.findById(req.query.id)
    res.status(200).json({
     response: username
    })
})

module.exports = {
    getUsername
}