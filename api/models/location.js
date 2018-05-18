const mongoose = require('mongoose');
const LocationSchema = require('../schemas/location');

var LocationModel = mongoose.model('Location', LocationSchema);

exports.getLocations = async () => {
    return await LocationModel.find().exec();
};

exports.getLocation = async id => {
    return await LocationModel.findById(id).exec();
};

exports.addLocation = async location => {
    return await LocationModel.create(location);
};

exports.updateLocation = async (id, update) => {
    return await LocationModel.findByIdAndUpdate(id, update, {
        runValidators: true,
        new: true
    }).exec();
};

exports.removeLocation = async id => {
    return await LocationModel.findByIdAndRemove(id).exec();
};

exports.Model = LocationModel;
