const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  entries: [{
  title: String,
  content: String
}]
});

module.exports = mongoose.model("ScholarApplicationContent", schema);
