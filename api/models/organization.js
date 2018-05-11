const mongoose = require('mongoose');

var schema = mongoose.Schema();
var model = mongoose.model('organizations', schema);

model.getOrganizations = (callback) => {
    model.find(callback);
};

model.getOrganizationById = (id, callback) => {
    model.findById(id, callback);
};

module.exports = model;
