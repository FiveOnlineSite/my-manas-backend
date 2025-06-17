const mongoose = require("mongoose");

const masterQuoteSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ["home", "about", "academy", "vidhyavanam"]
  },
  quote: {
    type: String,
    required: true
  },
  buttonText: {
    type: String
  },
  buttonLink: {
    type: String
  }
});

module.exports = mongoose.model("MasterQuote", masterQuoteSchema);
