const mongoose = require("mongoose");

const connect = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: process.env.DB_NAME ? process.env.DB_NAME : "dev",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed");
  }
};

module.exports = connect;
