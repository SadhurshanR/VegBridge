const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model('Guide', guideSchema);
