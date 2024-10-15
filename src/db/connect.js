const mongoose = require("mongoose");

const connect = async (DATABASE_URL) => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed");
  }
};

module.exports = connect;
