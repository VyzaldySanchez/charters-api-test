//Defines routes handlers for the API
'use strict';

//var chartersController = require('../controllers/chartersController');

var index = function(req, res) {
  let response = JSON.stringify({
    greet: 'Hello fellow.'
  });
  return res(response);
};

var getCharter = function(req, res) {
  let message = {
    value: () => 'This is the charter for user\'s ID: ' + req.params
      .id
  };

  return res(JSON.stringify(message.value()));
};

var registerCharter = function(req, res) {
  let charterToSave = encodeURIComponent(req.params.charter);

  return res('The charter to save is: ' + charterToSave);
};

module.exports = {
  index: index,
  getCharter: getCharter,
  registerCharter: registerCharter
};
