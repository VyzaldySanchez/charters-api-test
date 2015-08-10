'use strict';

var Mongoose = require('mongoose'),
  db = Mongoose.connection;

var charterSchema = new Mongoose.Schema({
  charter: {
    type: String,
    required: true
  }
});

var Charter = Mongoose.model('charter', charterSchema);

module.exports = Charter;
