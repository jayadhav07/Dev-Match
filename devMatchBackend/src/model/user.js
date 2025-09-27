const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: `{VALUE} is not a valid gender type`,
    },
  },
  photoUrl: {
    type: String,
    default: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png",
  },
  skills: {
    type: [String],
  },
  about: {
    type: String,
    default: "This is default",
  },
});

module.exports = mongoose.model("User", userSchema);
