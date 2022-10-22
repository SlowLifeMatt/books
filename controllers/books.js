// This is the controller file for Books
const express = require('express')
const bookRouter = express.Router()
const bookData = require("../models/seed")
const Book = require('../models/book.js')


// I N D U C E S - Index New Delete Update Create Edit Show

// INDEX
bookRouter.get("/", (req, res) => {
  Book.find({}, (error, allBooks) => {
    res.render("index.ejs", { books: allBooks })
  })
})

// NEW
bookRouter.get("/new", (req, res) => {
  res.render("new.ejs")
})

// DELETE
bookRouter.delete("/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, deletedBook) => {
    res.redirect("/books")
  })
})

// UPDATE
bookRouter.put("/:id", (req, res) => {
  req.body.completed = (req.body.completed === "on") ? true : false;
  Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedBook) => {
    // redirect user to showpage
    res.redirect(`/books/${req.params.id}`);
  })
})

// CREATE
bookRouter.post("/", (req, res) => {
  req.body.completed = req.body.completed === "on" ? true : false;
  Book.create(req.body, (error, createdBook) => {
    res.redirect("/books")
  })
})

// EDIT
bookRouter.get("/:id/edit", (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    res.render("edit.ejs", { book: foundBook })
  })
})

// SHOW
bookRouter.get("/:id", (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    res.render("show.ejs", { book: foundBook })
  })
})

// Seed
bookRouter.get("/seed", (req, res) => {
  Book.deleteMany({}, (error, allBooks) => {})
  Book.create(bookData, (error, data) => {
    res.redirect("/books");
  });
})

module.exports = bookRouter