const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String, required: true }, 
  items: [
    {
      title: String,
      date: String,
    },
  ],
});

module.exports = mongoose.model("ScholarApplicationTimeline", schema);
