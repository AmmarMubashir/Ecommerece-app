// const mongoose = require("mongoose");

// const connectDatabase = async () => {
//   try {
//     const DB = process.env.DB_URL.replace(
//       "<PASSWORD>",
//       process.env.DB_PASSWORD
//     );

//     const data = await mongoose.connect(DB, {
//       useNewUrlParser: true,
//       useCreateIndex: true, // deprecated
//       useUnifiedTopology: true,
//     });

//     console.log("Database connection successful");
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = connectDatabase;
