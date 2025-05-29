const mongoose = require("mongoose");

const leaderSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    url: String,
    altText: String
  },
  buttonText: String,
  buttonLink: String
});

module.exports = mongoose.model("FutureLeaders", leaderSchema);
