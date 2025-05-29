const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    url: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: ""
    }
  }
}, { _id: false });

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  items: {
    type: [achievementSchema],
    default: []
  }
});

module.exports = mongoose.model("DonateAchievements", schema);
