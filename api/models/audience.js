const mongoose = require('mongoose');
const AudienceSchema = require('../schemas/audience');

var AudienceModel = mongoose.model('Audience', AudienceSchema);

exports.getAudiences = async () => {
    return await AudienceModel.find().exec();
};

exports.getAudience = async id => {
    return await AudienceModel.findById(id).exec();
};

exports.addAudience = async audience => {
    return await AudienceModel.create(audience);
};

exports.updateAudience = async (id, update) => {
    return await AudienceModel.findByIdAndUpdate(id, update, {
        runValidators: true,
        new: true
    }).exec();
};

exports.removeAudience = async id => {
    return await AudienceModel.findByIdAndRemove(id).exec();
};

exports.Model = AudienceModel;
