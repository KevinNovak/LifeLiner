const mongoose = require('mongoose');
const AudienceSchema = require('../schemas/audience');

var AudienceModel = mongoose.model('audiences', AudienceSchema);

AudienceModel.getAudiences = (callback) => {
    AudienceModel.find(callback);
};

AudienceModel.getAudienceNames = async () => {
    var audienceNames = [];
    await AudienceModel.distinct('name', (error, names) => {
        audienceNames = names;
    });
    return audienceNames;
};

AudienceModel.getAudience = (id, callback) => {
    AudienceModel.findById(id, callback);
};

AudienceModel.addAudience = (audience, callback) => {
    AudienceModel.create(audience, callback);
};

AudienceModel.removeAudience = (id, callback) => {
    AudienceModel.findByIdAndRemove(id, callback);
};

module.exports = AudienceModel;
