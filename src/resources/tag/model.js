const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isVisible: { type: Boolean, required: true, default: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  category: { type: mongoose.Types.ObjectId, ref: 'category' },
  parent: { type: mongoose.Types.ObjectId, required: false },
});

const model = mongoose.model('tag', schema);

module.exports = model;
