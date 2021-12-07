const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//////////////////////
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin" , "*");
//     res.header("Access-Control-Allow-Headers" , "*");
//     if(req.method === "OPTIONS"){
//         res.header("Access-Control-Allow-Methods" , "POST")
//         return res.status(200).json({})
//     }
//     next()
// })
///////////////////
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongoDB is connected')
})

//router use
const exercisesRouter = require('./routes/excercises')
const usersRouter = require('./routes/users')
app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`servver is running on poprt ${port}`);
})