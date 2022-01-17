const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  sourceId: {
    type: Number
  },
  branchSourceId: Number,
  name: String
});