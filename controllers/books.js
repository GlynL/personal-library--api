const Book = require("../models/book");

exports.addBook = async function(req, res, next) {
  try {
    const title = req.body.title;
    const newBook = await Book.create({ title });
    res.json({
      _id: newBook._id,
      title: newBook.title
    });
  } catch (err) {
    next(err);
  }
};

exports.getBooks = async function(req, res, next) {
  try {
    const books = await Book.find({});
    const booksData = books.map(book => {
      const commentsLength = book.comments.length;
      return { ...book._doc, comments: commentsLength };
    });
    res.json(booksData);
  } catch (err) {
    next(err);
  }
};

exports.getSingle = async function(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) throw new Error("No book found");
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.addComment = async function(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    const comment = req.body.comment;
    book.comments.push({ comment });
    book.save();
    res.json(book);
  } catch (err) {
    next(err);
  }
  // const book = await Book.update(
  //   { _id: req.id },
  //   { $push: { comments: { comment: req.body.comment } } },
  //   done
  // );
};

exports.removeBook = async function(req, res, next) {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) throw new Error("invalid id");
    res.json({ message: "Successfully Removed" });
  } catch (err) {
    next(err);
  }
};

exports.removeAllBooks = async function(req, res, next) {
  Book.deleteMany({})
    .then(() => res.json({ message: "All Books Removed" }))
    .catch(err => next(err));
};
