const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;