const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: String,
    logo: {
      url: String,
      altText: String,
    },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AcademyHistory", schema);
