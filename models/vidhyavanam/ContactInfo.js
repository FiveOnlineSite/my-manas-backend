const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
email: String,
address: String,
resumeLink: String
});

module.exports = mongoose.model("VidhyaContactInfo", schema);
