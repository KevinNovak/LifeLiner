const AudienceModel = require('../models/audience');

async function audienceIdsExist(audienceIds) {
    try {
        for (var audienceId of audienceIds) {
            var count = await AudienceModel.count({ _id: audienceId });
            if (count < 1) {
                return false;
            }
        }
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

module.exports = {
    audienceIdsExist
};
