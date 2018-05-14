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

async function updateAudience(request, response) {
    try {
        var id = request.params.id;
        var update = request.body;
        var audience = await AudienceModel.updateAudience(id, update);
        if (!audience) {
            response.status(404).json({
                error: `Could not find audience with ID: ${id}.`
            });
        } else {
            response.status(200).json(audience);
        }
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

// TODO: Don't remove unless not being used
async function removeAudience(request, response) {
    try {
        var id = request.params.id;
        var audience = await AudienceModel.removeAudience(id);
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

module.exports = {
    getAudiences,
    getAudience,
    addAudience,
    updateAudience,
    removeAudience
};
