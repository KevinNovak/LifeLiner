const AudienceModel = require('../models/audience');
const OrganizationModel = require('../models/organization');
const audienceValidator = require('../validators/audienceValidator');
const language = require('../data/language.json');

async function getAudiences(request, response) {
    try {
        var active = request.query.active;
        var audiences;
        if (active == '1') {
            audiences = await getActiveAudiences();
        } else {
            audiences = await AudienceModel.getAudiences();
        }
        response.status(200).json(audiences);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            error: language.errors['500']
        });
    }
}

async function getActiveAudiences() {
    var audienceIds = await OrganizationModel.getAudienceIds();
    var query = { _id: { $in: audienceIds } };
    return await AudienceModel.getAudiences(query);
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
        console.error(error);
        response.status(500).json({
            error: language.errors['500']
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
            console.error(error);
            response.status(500).json({
                error: language.errors['500']
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
            console.error(error);
            response.status(500).json({
                error: language.errors['500']
            });
        }
    }
}

async function removeAudience(request, response) {
    try {
        var id = request.params.id;
        if (await audienceValidator.audienceIdUsed(id)) {
            response.status(403).json({
                error: `The ID: ${id} is currently being used.`
            });
        } else {
            var audience = await AudienceModel.removeAudience(id);
            if (!audience) {
                response.status(404).json({
                    error: `Could not find audience with ID: ${id}.`
                });
            } else {
                response.status(200).json(audience);
            }
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({
            error: language.errors['500']
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
