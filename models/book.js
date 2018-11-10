const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  comment: {
    type: String
  }
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title cannot be blank"
  },
  comments: [commentsSchema]
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
