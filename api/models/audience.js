const mongoose = require('mongoose');
const AudienceSchema = require('../schemas/audience');

var AudienceModel = mongoose.model('audiences', AudienceSchema);

AudienceModel.getAudiences = async () => {
    return await AudienceModel.find().exec();
};

AudienceModel.getAudience = async id => {
    return await AudienceModel.findById(id).exec();
};

AudienceModel.addAudience = (audience, callback) => {
    AudienceModel.create(audience, callback);
};

AudienceModel.updateAudience = (id, audience, options, callback) => {
    AudienceModel.findByIdAndUpdate(id, audience, options, callback);
};

AudienceModel.removeAudience = (id, callback) => {
    AudienceModel.findByIdAndRemove(id, callback);
};

module.exports = AudienceModel;
