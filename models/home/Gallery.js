const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  // type: { type: String, enum: ['image', 'video'] },
  url: String,
   url2: String,    
  altText: String,
});

module.exports = mongoose.model("Gallery", gallerySchema);
