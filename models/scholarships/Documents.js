const mongoose = require("mongoose");

const documentImageSchema = new mongoose.Schema({
  image: {
    url: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: ""
    }
  },
  name: {
    type: String,
    required: true
  }
}, { _id: false });

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  files: {
    type: [documentImageSchema],
    default: []
  }
});

module.exports = mongoose.model("ScholarDocuments", schema);
