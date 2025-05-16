const mongoose = require("mongoose");

const contactPageSchema = new mongoose.Schema({
  title: String,
  india: {
    email: String,
    address: String
  },
  usa: {
    email: String,
    address: String
  }
});

module.exports = mongoose.model("ContactPage", contactPageSchema);
