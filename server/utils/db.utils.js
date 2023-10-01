require('dotenv').config();
const mongoose = require("mongoose");

const DB_URI = process.env.MOGOURI;


module.exports.connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};
