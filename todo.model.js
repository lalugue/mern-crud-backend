const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Todo = new Schema({
        todo_description: {
            type: String
        },
        todo_responsible: {
            type: String
        },
        todo_priority: {
            type: String
        },
        todo_completed: {
            type: Boolean
        },
        todo_deleted: {
            type: Boolean
        }    
    },
    { 
        strict: false

    })

//create new Model named 'Todo' using schema Todo
module.exports = mongoose.model('Todo',Todo)