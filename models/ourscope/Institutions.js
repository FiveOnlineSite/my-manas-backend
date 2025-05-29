const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    url: String,
    altText: String
  },
  buttonText: String,
  buttonLink: String
});

module.exports = mongoose.model("ScopeInstitutions", institutionSchema);
