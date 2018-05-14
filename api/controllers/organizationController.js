const OrganizationModel = require('../models/organization');

async function getOrganizations(request, response) {
    try {
        var organizations = await OrganizationModel.getOrganizations();
        response.status(200).json(organizations);
    } catch (error) {
        response.status(500).json({
            error: error.message
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
        response.status(500).json({
            error: error.message
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
            response.status(500).json({
                error: error.message
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
            response.status(500).json({
                error: error.message
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
        response.status(500).json({
            error: error.message
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
