const mongoose = require("mongoose");

const masterDonateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: false
  },
  buttonLink: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("MasterDonate", masterDonateSchema);
