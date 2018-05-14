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

function addAudience(request, response) {
    var audience = request.body;

    AudienceModel.addAudience(audience, (error, audience) => {
        if (error) {
            if (
                error.name == 'ValidationError' ||
                error.message.includes('E11000')
            ) {
                response.status(400).json({
                    error: error.message
                });
            } else {
                response.status(500).json({
                    error: error.message
                });
            }
        } else {
            response.status(201).json(audience);
        }
    });
}

function updateAudience(request, response) {
    var id = request.params.id;
    var audience = request.body;

    AudienceModel.updateAudience(
        id,
        audience,
        { runValidators: true, new: true },
        (error, audience) => {
            if (error) {
                if (
                    error.name == 'ValidationError' ||
                    error.message.includes('E11000')
                ) {
                    response.status(400).json({
                        error: error.message
                    });
                } else {
                    response.status(500).json({
                        error: error.message
                    });
                }
            } else {
                if (!audience) {
                    response.status(404).json({
                        error: `Could not find audience with ID: ${id}.`
                    });
                } else {
                    response.status(200).json(audience);
                }
            }
        }
    );
}

// TODO: Don't remove unless not being used
function removeAudience(request, response) {
    var id = request.params.id;

    AudienceModel.removeAudience(id, (error, audience) => {
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
    getAudience,
    addAudience,
    updateAudience,
    removeAudience
};
