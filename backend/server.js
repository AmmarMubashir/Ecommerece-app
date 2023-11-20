const app = require("./app");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  // This error handling is for using a variable that is not defined yet
  console.log("Error", err.message);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// const connectDatabase = require("./config/database");
// config
dotenv.config({ path: "backend/config/config.env" });

// connecting to database
const DB = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("Database connection successful".blue.underline));

app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on http://localhost:${process.env.PORT}`.yellow.bold
  );
});

// Unhandled promise Rejection
process.on("unhandledRejection", (err) => {
  // This error handling is of error in syntax
  console.log(`Error: ${err.message}`);

  console.log("Shutting down the server due to unhandled promise rejection");

  // app.close(() => {
  process.exit(1);
  // });
});
