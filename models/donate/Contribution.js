const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  }
}, { _id: false });

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  items: {
    type: [itemSchema],
    default: []
  }
});

module.exports = mongoose.model("DonateContribution", schema);
