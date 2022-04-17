const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const Url = process.env.URL;
    const conn = await mongoose.connect(Url);
    console.log(`Database Connected : ${conn.connection.host}`.bgYellow.bold);
  } catch (error) {
    console.log(`Database Not Connected :${error.message}`.bgRed.bold);
  }
};
module.exports = connectDb;
