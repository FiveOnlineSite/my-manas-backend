const mongoose = require("mongoose");

const overviewSchema = new mongoose.Schema({
  title: String,
  description1: String,
  description2: String,
  bodName: String,
  bodImage: {
    url: String,
    altText: String,
  },
  bodSignature: {
    url: String,
    altText: String,
  }
});

module.exports = mongoose.model("Overview", overviewSchema);
