const AudienceModel = require('../models/audience');

function getAudiences(request, response) {
    AudienceModel.getAudiences((error, audiences) => {
        if (error) {
            response.status(500).json({
                error: error.message
            });
        } else {
            response.status(200).json(audiences);
        }
    });
}

module.exports = {
    getAudiences
};
