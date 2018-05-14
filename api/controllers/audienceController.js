const AudienceModel = require('../models/audience');

async function getAudiences(request, response) {
    try {
        var audiences = await AudienceModel.getAudiences();
        response.status(200).json(audiences);
    } catch (error) {
        response.status(500).json({
            error: error.message
        });
    }
}

async function getAudience(request, response) {
    try {
        var id = request.params.id;
        var audience = await AudienceModel.getAudience(id);
        if (!audience) {
            response.status(404).json({
                error: `Could not find audience with ID: ${id}.`
            });
        } else {
            response.status(200).json(audience);
        }
    } catch (error) {
        response.status(500).json({
            error: error.message
        });
    }
}

async function addAudience(request, response) {
    try {
        var audienceToAdd = request.body;
        var audience = await AudienceModel.addAudience(audienceToAdd);
        response.status(201).json(audience);
    } catch (error) {
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
    }
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
