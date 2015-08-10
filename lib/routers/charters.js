//Defines routes handlers for the API
'use strict';

var chartersController = require('../controllers/chartersController');

var index = function(req, res) {

  return res(chartersController.getCharters());

};

var getCharter = function(req, res) {

  let charter = chartersController.getCharter(req.params.id);

  return res(charter);

};

var registerCharter = function(req, res) {
  let charterToSave = req.payload.charter,
    result = chartersController.saveCharter(charterToSave);

  return res(result);
};

var updateCharter = function(req, res) {
  if (chartersController.updateCharter(req.params.charterId, req.payload.newCharter)) {
    return res('Charter updated succesfully.');
  } else {
    return res(chartersController.updateCharter(req.params.charterId, req.payload.newCharter));
  }

};

var deleteCharter = function(req, res) {
  let id = req.params.id;

  return res(chartersController.deleteCharter(id));
};

module.exports = {
  index: index,
  getCharter: getCharter,
  registerCharter: registerCharter,
  updateCharter: updateCharter,
  deleteCharter: deleteCharter
};
