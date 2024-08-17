// models/HOD.js
const mongoose = require('mongoose');

const hodSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  branch: { type: String, required: true },
});

module.exports = mongoose.model('HOD', hodSchema);
