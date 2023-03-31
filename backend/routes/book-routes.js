const express = require('express');
const router = express.Router();
const Book = require("../model/Book");
const bookController = require('../controllers/book-controller');

// console.log("in Routes");
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getById);
router.post("/", bookController.addBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router ;
