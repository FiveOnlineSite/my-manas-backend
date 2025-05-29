const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  description: String,

  goals: [
    {
      title: String,
      description: String,
      images: [
        {
          url: String,
          altText: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("ScholarOurGoal", schema);
