const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  whatsapp: String,
instagram: String
});

module.exports = mongoose.model("VidhyaHowToApply", schema);
