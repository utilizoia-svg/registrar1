const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  meta: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Register', RegisterSchema);
