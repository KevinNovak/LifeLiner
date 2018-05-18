const mongoose = require('mongoose');
const LocationSchema = require('../schemas/location');

var LocationModel = mongoose.model('Location', LocationSchema);

exports.getLocations = async () => {
    return await LocationModel.find().exec();
};

exports.Model = LocationModel;
