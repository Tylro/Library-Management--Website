const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { authRouter } = require("./routes/auth");
const books = require("./routes/books");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:8080", "http://localhost:8081"] }));

const port = "9090";

app.use(authRouter);
app.use(books);

app.listen(port, () => {
  console.log("Library server running on port " + port);
});
