const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://jayadhav2000:z3tdFdiLbzYcc39L@cluster0.wlozdd4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = connectDB;
