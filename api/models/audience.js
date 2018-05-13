const mongoose = require('mongoose');
const AudienceSchema = require('../schemas/audience');

var AudienceModel = mongoose.model('audiences', AudienceSchema);

AudienceModel.getAudiences = (callback) => {
    AudienceModel.find(callback);
};

module.exports = AudienceModel;
