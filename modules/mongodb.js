const mongoose = require("mongoose");
require("./config");

const db = process.env.MONGO_URL || "";

(async () => {
  try {
    await mongoose.connect(db);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error: " + error.message);
  }
})();