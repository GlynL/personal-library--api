// https://spark-cathedral.glitch.me/ --- example project

// I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id.
// I can get / api / books to retrieve an aray of all books containing title, _id, & commentcount.
// I can get / api / books / { _id } to retrieve a single object of a book containing title, _id, & an array of comments(empty array if no comments present).
// I can post a comment to / api / books / { _id } to add a comment to a book and returned will be the books object similar to get / api / books / { _id }.
// I can delete /api/books / { _id } to delete a book from the collection.Returned will be 'delete successful' if successful.
// If I try to request a book that doesn't exist I will get a 'no book exists' message.
// I can send a delete request to / api / books to delete all books in the database.Returned will be 'complete delete successful' if successful.
//   All 6 functional tests requiered are complete and passing.

const express = require("express");
const helmet = require("helmet");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

const booksRoutes = require("./routes/books");
const { errorHandler } = require("./helpers/error");

app.use(
  helmet({
    hidePoweredBy: {
      setTo: "PHP 4.2.0"
    },
    noCache: true
  })
);

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.set("debug", true);
mongoose.connect(
  process.env.DB || "mongodb://localhost/personal-library",
  {
    useNewUrlParser: true
  }
);
mongoose.Promise = Promise;

// clear db while developing/testing
// const Books = require("./models/book");
// Books.deleteMany({}, () => console.log("all books removed"));

app.use("/api/books", booksRoutes);

app.get("/", (req, res) => res.send("hi"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
