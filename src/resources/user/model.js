const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const model = mongoose.model('user', schema);

module.exports = model;
