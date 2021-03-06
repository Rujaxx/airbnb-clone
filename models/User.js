const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : [true, 'Please add your name']
    },
    email : {
        type : String,
        trim : true,
        required : [true, 'Please add your email'],
        unique : true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
          ]
    },
    password : {
        type : String,
        trim : true,
        required : [true, 'Please add a password'],
        minlength : 6,
        select : false
    },
    createdAt :{
        type : Date,
        default : Date.now()
    },
    updatedAt :{
        type : Date,
        default : new Date()
    }
},{timestamps : true})


//Match Password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

//Encrypting password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
      }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

// Get signed jwt token
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id : this._id }, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRE
    })
}



module.exports = mongoose.model('User', UserSchema)