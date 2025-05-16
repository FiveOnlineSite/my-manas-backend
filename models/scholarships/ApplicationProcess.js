const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String, // Rich text (HTML from editor)
    required: true
  }
}, { _id: false });

const scholarApplicationProcessSchema = new mongoose.Schema({
  entries: {
    type: [contentSchema],
    default: []
  }
});

module.exports = mongoose.model("ScholarApplicationProcess", scholarApplicationProcessSchema);
