const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err,req,res,next) => {
    let error = {...err};

    error.message = err.message

    console.log(err)

    // Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }
    
    // Mongoose Duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode).json({
        success: false,
        error : error.message || "Server Error"
    })        
}

module.exports = errorHandler;