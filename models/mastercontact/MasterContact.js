const mongoose = require("mongoose");

const masterContactSchema = new mongoose.Schema({
  subtitle: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  submitButtonText: {
    type: String
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
});

module.exports = mongoose.model("MasterContact", masterContactSchema);
