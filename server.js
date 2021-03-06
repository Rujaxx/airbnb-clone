const express = require('express')
const dotenv = require('dotenv')
const errorHandler = require('./middlewares/error')

//Load ENV vars
dotenv.config({ path : './config/config.env'})

//Database
const connectDB = require('./config/db')
connectDB()

//Router files
const auth = require('./routes/auth')

const app = express()

//Body Parser
app.use(express.json())

//Routes
app.use('/api/v1/auth', auth)

//ErrorHandler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT,console.log(`App is listening at ${PORT}`))