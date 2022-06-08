const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  address: { type: String, required: true },
  tel: { type: String, required: true },
  zalo: { type: String, required: false },
  mail: { type: String, required: true },
  description: { type: String, required: false },
  isVisible: { type: Boolean, required: true, default: false },
  images: { type: Array, default: [] },
});

const model = mongoose.model('branch', schema);

module.exports = model;
