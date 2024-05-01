const mongoose = require("mongoose");

let conn = null;
exports.connectDatabase = async () => {
  if (conn == null) {
    console.log("Creating new connection to the database....");

     const uri = process.env.DB;
     console.log(uri);

    conn = await mongoose.connect(process.env.DB, {
      serverSelectionTimeoutMS: 50000,
    });

    console.log("Connection to the database established successfully");
    return conn;
  }
  console.log(
    "Connection already established, reusing the existing connection"
  );
};