const express = require('express')
const dotenv = require('dotenv').config()
const {ErrorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/authusers', require('./routes/userauthRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/userData', require('./routes/UserDataRoutes'))

app.use(ErrorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))