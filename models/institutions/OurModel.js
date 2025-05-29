const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
description: String,
icons: [{
  icon: {
    url: String,
    altText: String
  },
  title: String,
  description: String
}]
});

module.exports = mongoose.model("InstitutionOurModel", schema);
