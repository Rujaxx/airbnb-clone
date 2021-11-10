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