const mongoose = require('mongoose');

const accordionSchema = new mongoose.Schema({
  title: String,
  description: String
});

const missionSchema = new mongoose.Schema({
  subtitle: String,
  title: String,
  image: {
    url: String,
    altText: String
  },
  accordions: [accordionSchema]
});

module.exports = mongoose.model("Mission", missionSchema);
