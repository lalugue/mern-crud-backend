const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 4000

app.use(cors())
app.use(bodyParser.json)



const connection = mongoose.connection
mongoose.connect('mongodb://127.0.0.1:27017/todos',{useNewUrlParser: true, useUnifiedTopology: true})

connection.on('connecting', ()=>{console.log("database is connecting")});

connection.once('open', () => {
    console.log("MongoDB database connection is successful!")
})

connection.once('closed', () => {
    console.log("MongoDB database connection was closed")
})

connection.on('error', (err) =>{
    console.log('MongoDB failed to connect, please check: ')
    console.log(err)
})

app.listen(PORT, ()=> {
    console.log("Server is running on Port: " + PORT)    
})