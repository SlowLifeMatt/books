const mongoose = require('mongoose')

// this is our book schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true},
    author: { type: String, required: true},
    completed: Boolean
})

// this is where we define our model using the schema we created
const book = mongoose.model("Book", bookSchema)

// this is how we send vars to other files
module.exports = book