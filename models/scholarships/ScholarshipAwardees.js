const mongoose = require("mongoose");

const awardeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  institute: {
    type: String,
    required: true
  },
  image: {
    url: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: ""
    }
  }
}, { _id: false });

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  awardees: {
    type: [awardeeSchema],
    default: []
  }
});

module.exports = mongoose.model("ScholarScholarshipAwardees", schema);
