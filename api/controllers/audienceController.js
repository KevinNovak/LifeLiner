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

function getAudience(request, response) {
    var id = request.params.id;

    AudienceModel.getAudience(id, (error, audience) => {
        if (error) {
            response.status(500).json({
                error: error.message
            });
        } else {
            if (!audience) {
                response.status(404).json({
                    error: `Could not find audience with ID: ${id}.`
                });
            } else {
                response.status(200).json(audience);
            }
        }
    });
}

module.exports = {
    getAudiences,
    getAudience
};
