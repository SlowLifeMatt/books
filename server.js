// Dependencies
const express = require("express")
const app = express()
const mongoose = require('mongoose')
// import our book model to use
const Book = require('./models/book.js')


// Pulls enviorment vars into server js from .env
require("dotenv").config()

const PORT = process.env.PORT


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Database Connection Error/Success Logs
// Define callback functions for various events
const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))

// MIDDLEWARE
// Body Parser middleware - give us access to req.body
app.use(express.urlencoded({ extended: true}))

// I N D U C E S - Index, New, Delete, Update, Create, Edit, Show


// INDEX
app.get("/books", (req,res) => {
    Book.find({}, (error, allBooks) => {
        res.render("index.ejs", { 
            books: allBooks})
    })
})

// NEW
app.get("/books/new", (req,res) => {
    res.render("new.ejs")
})

// CREATE
app.post("/books", (req,res) => {
    if(req.body.completed ==="on") {
        // if the "completed" check box is checked, change it to true
        req.body.completed = true
    } else {
        // if the checkbox is not checked, change it to false
        req.body.completed = false
    }

    Book.create(req.body, (error, createdBook) => {
        res.redirect("/books");
    })
})

// SHOW
app.get("/books/:id", (req,res) => {
    Book.findById(req.params.id, (err, foundBook) => {
        console.log(err)
      
        res.render("show.ejs", {
            Book: foundBook,
        })
    })
})





// Listener
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}...`))