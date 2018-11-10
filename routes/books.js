const express = require("express");
const router = express.Router();
const {
  addBook,
  getBooks,
  getSingle,
  addComment,
  removeBook,
  removeAllBooks
} = require("../controllers/books");

router.get("/", getBooks);

router.post("/", addBook);

router.get("/:id", getSingle);

router.post("/:id", addComment);

router.delete("/:id", removeBook);

router.delete("/", removeAllBooks);

module.exports = router;
