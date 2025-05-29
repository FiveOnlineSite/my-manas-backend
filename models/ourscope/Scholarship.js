const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({
  subtitle: String,
  title: String,
  description: String,
  image1: {
    url: String,
    altText: String
  },
  image2: {
    url: String,
    altText: String
  },
  buttonText: String,
  buttonLink: String
});

module.exports = mongoose.model("ScopeScholarship", scholarshipSchema);
