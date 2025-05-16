const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
description: String
});

module.exports = mongoose.model("DonateAboutUs", schema);
