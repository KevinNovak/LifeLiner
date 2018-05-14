const OrganizationModel = require('../models/organization');

async function getOrganizations(request, response) {
    try {
        var organizations = await OrganizationModel.getOrganizations();
        response.status(200).json(organizations);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            error: 'Internal server error.'
        });
    }
}

async function getOrganization(request, response) {
    try {
        var id = request.params.id;
        var organization = await OrganizationModel.getOrganization(id);
        if (!organization) {
            response.status(404).json({
                error: `Could not find organization with ID: ${id}.`
            });
        } else {
            response.status(200).json(organization);
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            error: 'Internal server error.'
        });
    }
}

async function addOrganization(request, response) {
    try {
        var organizationToAdd = request.body;
        var organization = await OrganizationModel.addOrganization(
            organizationToAdd
        );
        response.status(201).json(organization);
    } catch (error) {
        if (error.name == 'ValidationError') {
            response.status(400).json({
                error: error.message
            });
        } else {
            console.log(error.message);
            response.status(500).json({
                error: 'Internal server error.'
            });
        }
    }
}

async function updateOrganization(request, response) {
    try {
        var id = request.params.id;
        var update = request.body;
        var organization = await OrganizationModel.updateOrganization(
            id,
            update
        );
        if (!organization) {
            response.status(404).json({
                error: `Could not find organization with ID: ${id}.`
            });
        } else {
            response.status(200).json(organization);
        }
    } catch (error) {
        if (error.name == 'ValidationError') {
            response.status(400).json({
                error: error.message
            });
        } else {
            console.log(error.message);
            response.status(500).json({
                error: 'Internal server error.'
            });
        }
    }
}

async function removeOrganization(request, response) {
    try {
        var id = request.params.id;
        var organization = await OrganizationModel.removeOrganization(id);
        if (!organization) {
            response.status(404).json({
                error: `Could not find organization with ID: ${id}.`
            });
        } else {
            response.status(200).json(organization);
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            error: 'Internal server error.'
        });
    }
}

module.exports = {
    getOrganizations,
    getOrganization,
    addOrganization,
    updateOrganization,
    removeOrganization
};
