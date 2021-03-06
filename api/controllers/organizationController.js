const OrganizationModel = require('../models/organization');
const language = require('../data/language.json');

async function getOrganizations(request, response) {
    try {
        var page = parseInt(request.query.page);
        var limit = parseInt(request.query.limit);
        var populate = request.query.populate == '1';
        var organizations;
        if (page && limit) {
            organizations = await OrganizationModel.getOrganizationsByPage(
                page,
                limit,
                populate
            );
        } else {
            organizations = await OrganizationModel.getOrganizations(populate);
        }
        response.status(200).json(organizations);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            error: language.errors['500']
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
        console.error(error);
        response.status(500).json({
            error: language.errors['500']
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
            console.error(error);
            response.status(500).json({
                error: language.errors['500']
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
            console.error(error);
            response.status(500).json({
                error: language.errors['500']
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
        console.error(error);
        response.status(500).json({
            error: language.errors['500']
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
