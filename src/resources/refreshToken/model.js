const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
  token: { type: String, unique: true, required: true },
});

const model = mongoose.model('refreshToken', schema);

module.exports = model;
