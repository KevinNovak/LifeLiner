const AudienceModel = require('../models/audience');

async function validateAudiences(audienceIds) {
    for (var audienceId of audienceIds) {
        var count = await AudienceModel.count({ _id: audienceId });
        if (count < 1) {
            return false;
        }
    }
    return true;
}

module.exports = {
    validateAudiences
};
