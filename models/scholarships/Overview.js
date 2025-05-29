const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  description: String
});

module.exports = mongoose.model("ScholarOverview", schema);
