const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "must provide title"],
  },
  description: {
    type: String,
    required: [true, "must provide description"],
  },
  category: {
    type: Array,
    required: [true, "must provide array"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  writtenBy: {
    type: String,
    required: [true, "must provide author"],
  },
  writtenDate: {
    type: Date,
    default: Date.now(),
  },
  imageUrl: {
    type: String,
    required: [true, "must provide imageUrl"],
  },
});

module.exports = mongoose.model("News", NewsSchema);
