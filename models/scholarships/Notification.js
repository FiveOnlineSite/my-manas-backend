const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
description: String,
contents: [String]
});

module.exports = mongoose.model("ScholarNotification", schema);
