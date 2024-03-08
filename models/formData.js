const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  data: {type: Object, required: true},
});

module.exports = mongoose.model('FormData', formDataSchema);
