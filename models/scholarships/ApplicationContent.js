const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  contents: [{ type: String }], 
});

module.exports = mongoose.model("ScholarApplicationContent", schema);
