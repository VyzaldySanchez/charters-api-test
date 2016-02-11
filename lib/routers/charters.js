//Defines routes handlers for the API
'use strict';

var chartersController = require('../controllers/chartersController');

var index = function(req, res) {

    return res(chartersController.getCharters());

};

var getCharter = function(req, res) {

    var charter = chartersController.getCharter(req.params.id);

    return res(charter);

};

var registerCharter = function(req, res) {
    var charterToSave = req.payload.charter,
        result = chartersController.saveCharter(charterToSave);

    return res(result);
};

var updateCharter = function(req, res) {
    if (chartersController.updateCharter(req.params.charterId, req.payload.newCharter)) {
        return res('Charter updated succesfully.');
    }

    return res(chartersController.updateCharter(req.params.charterId, req.payload.newCharter));
};

var deleteCharter = function(req, res) {
    var id = req.params.id;

    return res(chartersController.deleteCharter(id));
};

module.exports = {
    index: index,
    getCharter: getCharter,
    registerCharter: registerCharter,
    updateCharter: updateCharter,
    deleteCharter: deleteCharter
};
