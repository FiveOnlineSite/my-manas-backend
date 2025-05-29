const mongoose = require("mongoose");

const valueSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    icon: {
      url: String,
      // altText: Str,
    },
  },
  { _id: false }
);

const ourValuesSchema = new mongoose.Schema({
  title: String,
  description: String,
  values: [valueSchema],
});

module.exports = mongoose.model("OurValues", ourValuesSchema);
