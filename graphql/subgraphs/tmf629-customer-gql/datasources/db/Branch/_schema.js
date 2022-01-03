const mongoose = require( 'mongoose');

module.exports = mongoose.Schema({
  sourceId: {
    type: Number
  },
  name: String,
  professions: Array
});