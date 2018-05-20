const OrganizationModel = require('../models/organization');
const AudienceModel = require('../models/audience');

async function audienceIdUsed(audienceId) {
    var audienceIds = (await OrganizationModel.getAudienceIds()).map(id =>
        id.toString()
    );
    if (audienceIds.includes(audienceId)) {
        return true;
    }
    return false;
}

async function audienceIdsExist(audienceIds) {
    for (var audienceId of audienceIds) {
        var count = await AudienceModel.Model.count({ _id: audienceId });
        if (count < 1) {
            return false;
        }
    }
    return true;
}

module.exports = {
    audienceIdUsed,
    audienceIdsExist
};
