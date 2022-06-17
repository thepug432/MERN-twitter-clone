const jwt = require('jsonwebtoken')
const bcrypt =  require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const register = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body

    if (!username || !password) {
        res.status(400)
        throw new Error('Not all need fields filled')
    }

    const userExists = await User.findOne({username})
    if (userExists) {
        res.status(400)
        throw new Error('User with that name exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        username: username,
        email: email,
        password: hashed
    })

    if (user) {
        res.status(201).json({
            id: user.id,
            username: user.username,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Something went wrong')
    }
})

const login = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body

    const user = await User.findOne({username})
    
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            id: user.id,
            username: user.username,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getdata = asyncHandler(async (req, res) => {
   const {id, username} = await User.findById(req.user.id)

   res.status(200).json({
    id: id,
    username: username
   })
})

//generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '10d'
    })
} 

module.exports = {
    register,
    login,
    getdata
}