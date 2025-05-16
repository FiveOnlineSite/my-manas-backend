const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
  subtitle: String,
  title: String,
  description: String,
  buttonText: String,
  buttonLink: String,
  image: {
    url: String,
    altText: String
  }
});

module.exports = mongoose.model("AboutUs", aboutUsSchema);
