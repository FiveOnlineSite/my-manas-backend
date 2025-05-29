const mongoose = require("mongoose");

const schema = new mongoose.Schema({
 
  title: String,
  description: String,
  icon: {
    url: String,
    altText: String
  }

});

module.exports = mongoose.model("AcademyGradeLevels", schema);
