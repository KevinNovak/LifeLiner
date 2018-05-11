const OrganizationModel = require('../models/organization');

function getOrganizations(request, response) {
    OrganizationModel.getOrganizations((error, organizations) => {
        if (error) {
            var message = error.message;
            response.status(500).json({
                error: message
            });
            console.error('Could not get organizations.');
            console.error(message);
        } else {
            response.status(200).json(organizations);
        }
    });
}

function getOrganizationById(request, response) {
    var id = request.params.id;

    OrganizationModel.getOrganizationById(id, (error, organization) => {
        if (error) {
            var message = error.message;
            response.status(500).json({
                error: message
            });
            console.error(`Error finding organization with ID: ${id}.`);
            console.error(message);
        } else {
            if (!organization) {
                var message = `Could not find organization with ID: ${id}.`;
                response.status(404).json({
                    error: message
                });
                console.error(message);
            } else {
                response.status(200).json(organization);
            }
        }
    });
}

function addOrganization(request, response) {
    var organization = request.body;

    OrganizationModel.addOrganization(organization, (error, organization) => {
        if (error) {
            var message = error.message;
            response.status(500).json({
                error: message
            });
            console.error('Could not create organization.');
            console.error('Body:', organization);
            console.error(message);
        } else {
            response.status(201).json(organization);
        }
    });
}

module.exports = {
    getOrganizations,
    getOrganizationById,
    addOrganization
};
