const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isVisible: { type: Boolean, required: true, default: true },
  orderCode: { type: String, required: true },
  name: { type: String },
  tel: { type: String, required: true },
  zalo: { type: String, required: false },
  address: { type: String, required: false },
  document: { type: String, required: false },
  receipt: { type: String, required: false },
  instruction: { type: String, required: false },
  category: { type: mongoose.Types.ObjectId, ref: 'category' },
  branch: { type: mongoose.Types.ObjectId, ref: 'branch' },
  tags: [{ type: mongoose.Types.ObjectId, ref: 'tag' }],
  cost: { type: Number, required: true, default: 0 },
  cash: { type: Number, required: true, default: 0 },
  note: { type: String, required: false },
  state: { type: Number, required: true, default: 0 },
});

const model = mongoose.model('order', schema);

module.exports = model;
