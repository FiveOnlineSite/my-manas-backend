const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  items: [{
  title: String,
  date: String
}]
});

module.exports = mongoose.model("ScholarApplicationTimeline", schema);
