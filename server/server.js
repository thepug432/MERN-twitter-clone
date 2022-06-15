const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(port, () => console.log(`server started on port ${port}`))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))