const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 4000

app.use(cors())
app.use(bodyParser.json())


/*
        ****** Mongoose Setup Part *****
*/

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
        ***** Express Setup Part *****
*/

let Todo = require('./todo.model')

//define the routes
const todoRoutes = express.Router()

//upon access of '/' in browser..
todoRoutes.route('/').get((req,res)=> {
   
    //find Todo entry in database
    Todo.find((err, todos)=> {
        if (err) {
            console.log("An error occurred while finding a Todo in the database: ")
            console.log(err)
        }
        else {
            console.log("fetching todos/ succcessful")
            res.json(todos) //print result in json form
        }
    })
    
    
})

todoRoutes.route('/:id').get((req,res)=>{
    let id = req.params.id
    Todo.findById(id, (err,todo) =>{
        res.json(todo)
    })
})

todoRoutes.route('/add').post((req,res)=>{
    let todo = new Todo(req.body)
    todo.save()
        .then(todo => {
            res.status(200).json({'todo':'todo added successfully!'})
        })
        .catch(err => {
            res.status(400).send('adding new todo failed!')
        })
})


//after defining the routes, use the routes
app.use('/todos', todoRoutes)


app.listen(PORT, ()=> {
    console.log("Server is running on Port: " + PORT)    
})