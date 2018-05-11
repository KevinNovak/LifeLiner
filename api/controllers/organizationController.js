const Organization = require('../models/organization');

function getOrganizations(request, response) {
    Organization.getOrganizations((error, organizations) => {
        if (error) {
            console.error('Could not get organizations.');
            console.error(error.message);
        }
        response.status(200).json(organizations);
    });
}

function getOrganizationById(request, response) {
    var id = request.params.id;

    Organization.getOrganizationById(id, (error, organization) => {
        if (error) {
            console.error(`Could not get organization with ID: ${id}.`);
            console.error(error.message);
        }
        response.status(200).json(organization);
    });
}

module.exports = {
    getOrganizations,
    getOrganizationById
};
