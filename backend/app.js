const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error");

// Use the express.json() middleware to parse incoming JSON requests.
app.use(express.json());

// imports
const products = require("./routes/productRoute");

app.get("/", (req, res) => {
  //   console.log("Working");
  res.send("Welcome!");
});

app.use("/api/v1", products);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
