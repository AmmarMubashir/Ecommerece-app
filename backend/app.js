const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const errorMiddleware = require("./middleware/error");

// Use the express.json() middleware to parse incoming JSON requests.
app.use(express.json());
app.use(cookieParser());

// imports
const products = require("./routes/productRoute");
const user = require("./routes/userRoute");
app.get("/", (req, res) => {
  //   console.log("Working");
  res.send("Welcome!");
});

app.use("/api/v1", products);
app.use("/api/v1", user);

// Middleware for Errors
// R5
app.use(errorMiddleware);

module.exports = app;
