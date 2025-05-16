const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  levels: [{
  title: String,
  description: String,
  icon: {
    url: String,
    altText: String
  }
}]
});

module.exports = mongoose.model("VidhyaGradeLevels", schema);
