const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  members: [{
  name: String,
  description: String,
  image: {
    url: String,
    altText: String
  }
}]
});

module.exports = mongoose.model("AcademyLeadershipTeam", schema);
