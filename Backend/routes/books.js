const express = require("express");
const randomId = require("random-id");
const router = express.Router();
const { bookModel, userModel } = require("../db/db");

router.get("/books/newBooks", (req, res) => {
  console.group("Searching for new books.");
  const newBooks = bookModel.find().limit(4);
  newBooks
    .then((newBooks) => {
      if (newBooks) {
        console.log("Found " + newBooks.length + " new books.");
        console.groupEnd();
        res.status(200).send(newBooks);
      } else {
        console.log("No new books found!!");
        console.groupEnd();
        res.status(200).send({ status: "New books not founds." });
      }
    })
    .catch((err) => {
      console.log("Error in fetching new books. \n -- " + err);
      console.groupEnd();
      res.status(400).send({ status: "Error in fetching new books.\n -- " + err });
    });
});
router.get("/books/searchedBooks", (req, res) => {
  const searchedTerm = req.query.searchQuery;
  console.group("Searching book " + searchedTerm + " in db.");
  bookModel
    .find({
      $or: [
        { b_id: searchedTerm },
        { name: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
        { author: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
        { genere: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
      ],
    })
    .then((searchedBooks) => {
      if (searchedBooks) {
        console.log("Found " + searchedBooks.length + " containing term " + searchedTerm);
        console.groupEnd();
        res.status(200).send(searchedBooks);
      } else {
        console.log("No book found with '" + searchedTerm + "' in it.");
        console.groupEnd();
        res.status(200).send({
          status: "No book found with '" + searchedTerm + "' in it.",
        });
      }
    })
    .catch((err) => {
      console.log("Error in finding searched book. \n" + err);
      console.groupEnd();
      res.status(400).send({
        status: "Error in finding searched book.\n " + err,
      });
    });
});

router.post("/book", (req, res) => {
  let book = req.body;
  console.group("Adding a new book :- " + book.name);
  book.b_id = "B_" + randomId(8, "aA0");
  book.coverPage = "https://m.media-amazon.com/images/I/71d3kAiuhLL._AC_UY327_QL65_.jpg";
  new bookModel(book)
    .save()
    .then(() => {
      console.log(book.name + " added successfully.");
      console.groupEnd();
      res.status(200).send({
        status: book.name + " added successfully.",
        b_id: book.b_id,
      });
    })
    .catch((err) => {
      console.log("Error in adding book \n --" + err);
      console.groupEnd();
      res.status(406).send({
        status: "Error in adding book \n --" + err,
      });
    });
});
router.delete("/book", ({ query }, res) => {
  const { b_id } = query;
  console.group("Deleting " + b_id);

  bookModel
    .deleteOne({ b_id })
    .then(({ deletedCount }) => {
      if (deletedCount) {
        console.log("Book removed successfully.");
        console.groupEnd();
        res.status(200).send({ status: "Book removed successfully." });
      } else {
        console.log("No such book found, failed to removed book.");
        console.groupEnd();
        res.status(400).send({ status: "No such book found, failed to removed book." });
      }
    })
    .catch((err) => {
      console.log("Couldn't delete book.\n" + err);
      console.groupEnd();
      res.status(400).send({ status: "Couldn't delete book." });
    });
});
router.put("/book", (req, res) => {
  let book = req.body;
  console.group("Editing book:- " + book.name);
  bookModel
    .updateOne({ b_id: book.b_id }, { $set: book })
    .then(({ nModified }) => {
      if (nModified > 0) {
        console.log("Updated book ");
        console.groupEnd();
        res.status(200).send({ status: "Updated book details successfully." });
      } else {
        console.log("Update failed");
        console.groupEnd();
        res.status(401).send({ status: "Updated failed." });
      }
    })
    .catch((err) => {
      console.log("Problem in server. Couldn't update users.\n" + err);
      console.groupEnd();
      res.status(500).send({ status: "Opps! Something went wrong." + err });
    });
});

module.exports = router;
