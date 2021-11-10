const mongoose = require('mongoose')

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
    }
})

module.exports = mongoose.model('User', UserSchema)