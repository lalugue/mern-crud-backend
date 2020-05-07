let Todo = require('../todo.model')

/*
       ***** Mongoose init part ***
*/
const mongoose = require('mongoose')

const connection = mongoose.connection
mongoose.connect('mongodb://127.0.0.1:27017/todos',{useNewUrlParser: true, useUnifiedTopology: true})

connection.on('connecting', ()=>{console.log("database is connecting")});

connection.on('open', () => {
    console.log("MongoDB database connection is successful!")
})

connection.once('closed', () => {
    console.log("MongoDB database connection was closed")
})

connection.on('error', (err) =>{
    console.log('MongoDB failed to connect, please check: ')
    console.log(err)
})


/*
        ***** Database test search proper *****
*/

Todo.find((err, todos)=> {
    console.log("finding")
    if (err) {
        console.log("An error occurred while finding a Todo in the database: ")
        console.log(err)
    }
    else {
        console.log("fetching todos/ succcessful")
        console.log(todos)
    }
})