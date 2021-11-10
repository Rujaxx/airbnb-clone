const User = require('../models/User')

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = async(req,res,next) => {
    const { name, email, password } = req.body

    //Create user
    const user = await User.create({ name, email, password})

    res.status(200).json({ success : true, message : 'User registered successfully'})
}

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async(req,res,next) => {
    const { email, password } = req.body

    if(!email || !password){
        res.status(400).json({ success: false, message : 'Please provide an email and password'})
    }

    //Check for user
    const user = await User.findOne({ email }).select('+password')

    if(!user){
        res.status(404).json({ success: false, message : 'User not found'})
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password)

    if(!isMatch){
        res.status(401).json({ success : true, message : 'Invalid Credentials'})
    }

    res.status(200).json({ success : true, message : 'User logged in successfully'})
}