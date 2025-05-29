const mongoose = require("mongoose");

const inspirationSchema = new mongoose.Schema({
  subtitle: String,
  title: String,
  description: String,
  image: {
    url: String,
    altText: String
  }
});

module.exports = mongoose.model("OurInspiration", inspirationSchema);
