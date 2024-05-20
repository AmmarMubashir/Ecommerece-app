const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Use the express.json() middleware to parse incoming JSON requests.
app.use(express.json({ limit: "200mb" }));
app.use(cookieParser());

// app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(fileUpload());

// imports
const products = require("./routes/productRoute");
const user = require("./routes/userRoute");
const orders = require("./routes/orderRoute");
const payments = require("./routes/paymentRoute");

// for checking the health of api
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});
app.get("/", (req, res) => {
  //   console.log("Working");
  res.send("Welcome!");
});

app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1", orders);
app.use("/api/v1", payments);

// Middleware for Errors
// R5
app.use(errorMiddleware);

module.exports = app;
