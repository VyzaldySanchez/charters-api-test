'use strict';

var Mongoose = require('mongoose'),
  db = Mongoose.connection,
  ObjectId = Mongoose.Types.ObjectId;

var Charter = require('../models/charter');

function getCharters() {
  return Charter.find();
}

function getCharter(_id) {
  return Charter.find({
    '_id': ObjectId(_id)
  });
}

function saveCharter(charter) {

  var newCharter = new Charter({
    charter: charter
  });

  return newCharter.save(function(err) {
    if (err) return err;
  });

}

function updateCharter(_id, value) {
  return Charter.update({
      '_id': ObjectId(_id)
    }, {
      'charter': value
    },
    function(err, model) {
      if (err) return err;
    });
}

function deleteCharter(_id) {
  return Charter.remove({ '_id': ObjectId(_id) }, function (err) {
    if (err) return err;
  })
}

module.exports = {
  getCharters: getCharters,
  getCharter: getCharter,
  saveCharter: saveCharter,
  updateCharter: updateCharter,
  deleteCharter: deleteCharter
};
