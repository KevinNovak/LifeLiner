const mongoose = require('mongoose');
const OrganizationSchema = require('../schemas/organization');

var OrganizationModel = mongoose.model('organizations', OrganizationSchema);

OrganizationModel.getOrganizations = (callback) => {
    OrganizationModel.find(callback);
};

OrganizationModel.getOrganization = (id, callback) => {
    OrganizationModel.findById(id, callback);
};

OrganizationModel.addOrganization = (organization, callback) => {
    OrganizationModel.create(organization, callback);
};

OrganizationModel.updateOrganization = (
    id,
    organization,
    options,
    callback
) => {
    OrganizationModel.findByIdAndUpdate(id, organization, options, callback);
};

OrganizationModel.removeOrganization = (id, callback) => {
    OrganizationModel.findByIdAndRemove(id, callback);
};

module.exports = OrganizationModel;
