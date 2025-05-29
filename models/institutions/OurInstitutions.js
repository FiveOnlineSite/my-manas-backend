const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
image: {
  url: String,
  altText: String
}
});

module.exports = mongoose.model("InstitutionOurInstitutions", schema);
