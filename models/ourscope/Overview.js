const mongoose = require("mongoose");

const overviewSchema = new mongoose.Schema({
  description: String
});

module.exports = mongoose.model("ScopeOverview", overviewSchema);
