const mongoose = require("mongoose");

const achievementItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String, // Rich-text from editor
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

const vidhyaAchievementsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  items: {
    type: [achievementItemSchema],
    default: []
  }
});

module.exports = mongoose.model("VidhyaAchievements", vidhyaAchievementsSchema);
