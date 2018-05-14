const mongoose = require('mongoose');
const OrganizationSchema = require('../schemas/organization');

var OrganizationModel = mongoose.model('organizations', OrganizationSchema);

OrganizationModel.getOrganizations = async () => {
    return await OrganizationModel.find().exec();
};

OrganizationModel.getOrganization = async id => {
    return await OrganizationModel.findById(id).exec();
};

OrganizationModel.addOrganization = async organization => {
    return await OrganizationModel.create(organization);
};

OrganizationModel.updateOrganization = async (id, update) => {
    return await OrganizationModel.findByIdAndUpdate(id, update, {
        runValidators: true,
        new: true
    }).exec();
};

OrganizationModel.removeOrganization = async id => {
    return await OrganizationModel.findByIdAndRemove(id).exec();
};

module.exports = OrganizationModel;
