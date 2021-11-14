const User = require('../models/User')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async(req,res,next) => {
    const { name, email, password } = req.body

    //Create user
    const user = await User.create({ name, email, password})

    const token = user.getSignedJwtToken()

    res.status(200).json({ success : true, message : 'User registered successfully' , token : token})
})

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async(req,res,next) => {
    const { email, password } = req.body

    if(!email || !password){
        return next(new ErrorResponse('Please provide an email and password',400))
    }

    //Check for user
    const user = await User.findOne({ email }).select('+password')

    if(!user){
        return next(new ErrorResponse('User not found',404))
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password)

    if(!isMatch){
        return next(new ErrorResponse('Invalid Credentials',400))
    }

    const token = user.getSignedJwtToken()

    res.status(200).json({ success : true, message : 'User logged in successfully', token : tokens})
}