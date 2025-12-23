const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDB = async (DB) => {
  try {
    const conn = await mongoose.connect(DB, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
