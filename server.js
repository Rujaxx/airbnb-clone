const express = require('express')
const dotenv = require('dotenv')

//Load ENV vars
dotenv.config({ path : './config/config.env'})

const app = express()

const PORT = process.env.PORT || 5000

const server = app.listen(PORT,console.log(`App is listening at ${PORT}`))