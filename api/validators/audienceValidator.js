const AudienceModel = require('../models/audience');

async function validateAudiences(audiences) {
    const audienceNames = (await AudienceModel.getAudiences()).map(
        (audience) => audience.name
    );
    for (var audience of audiences) {
        if (!audienceNames.includes(audience)) {
            return false;
        }
    }
    return true;
}

module.exports = {
    validateAudiences
};
