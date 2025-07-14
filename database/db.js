const mongoose = require('mongoose');

async function initDB() {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }
    await mongoose.connect(
      "mongodb+srv://thumatipavanchowdary:pavan2114101@cluster0.1dhdaie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error connecting Monodb", err.message);
    });
  } catch (err) {
    if (typeof err === "string") {
      console.log("Error connecting Monodb: ", err.toUpperCase());
      throw Error(err.toUpperCase());
    } else if (err instanceof Error) {
      console.log("Error connecting Monodb: ", err.message);
      throw Error(err.message);
    }
  }
}

module.exports = initDB;
