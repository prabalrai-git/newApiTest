const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "must provide username"],
    },
    email: {
      type: String,
      required: [true, "must provide email"],
    },
    password: {
      type: String,
      required: [true, "must provide password"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "must provide phoneNumber"],
    },
    age: {
      type: Number,
      required: [true, "must provide age"],
    },
    gender: {
      type: String,
      required: [true, "must provide gender"],
    },
    occupation: {
      type: String,
      required: [true, "must provide occupation"],
    },
    nonPreferences: {
      type: Array,
      default: [],
    },
    preferences: {
      type: Array,
      default: [],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
