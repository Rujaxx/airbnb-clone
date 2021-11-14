const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true,'Please add a title'],
        trim : true
    },
    description : {
        type : String,
        required : [true,'Please add a description'],
        trim : true
    },
    

})