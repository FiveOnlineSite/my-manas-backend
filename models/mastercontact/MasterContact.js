const mongoose = require("mongoose");

const masterContactSchema = new mongoose.Schema({
  subtitle: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
  },
  fullName: String,
  number: String,
  email: String,
  inquiryType: String,
  message: String,
  originPage: {
    type: String,
    required: true,
    enum: [
      "home",
      "about",
      "scope",
      "donate",
      "scholarship",
      "academy",
      "contact",
      "vidhyavanam",
      "news",
    ],
  },
  image: {
    url: {
      type: String,
      // required: true,
    },
    altText: {
      type: String,
      default: "",
    },
  },
});

module.exports = mongoose.model("MasterContact", masterContactSchema);
