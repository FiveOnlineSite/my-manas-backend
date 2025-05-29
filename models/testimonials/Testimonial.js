const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: String,
  designation: String,
  location: String,
  image: {
    url: String,
    altText: String
  }
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
