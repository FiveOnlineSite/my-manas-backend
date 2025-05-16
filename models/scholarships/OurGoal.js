const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
description: String,
image: {
  url: String,
  altText: String
},
goals: [{
  title: String,
  description: String
}]
});

module.exports = mongoose.model("ScholarOurGoal", schema);
