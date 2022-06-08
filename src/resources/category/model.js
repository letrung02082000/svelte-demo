const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isVisible: { type: Boolean, required: true, default: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  priority: { type: Number, required: true, default: 0 },
});

const model = mongoose.model('category', schema);

module.exports = model;
