const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const errorMiddleware = require("./middleware/error");

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Use the express.json() middleware to parse incoming JSON requests.
app.use(express.json());
app.use(cookieParser());

// imports
const products = require("./routes/productRoute");
const user = require("./routes/userRoute");
const orders = require("./routes/orderRoute");
app.get("/", (req, res) => {
  //   console.log("Working");
  res.send("Welcome!");
});

app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1", orders);

// Middleware for Errors
// R5
app.use(errorMiddleware);

module.exports = app;
