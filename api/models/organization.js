const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const OrganizationSchema = require('../schemas/organization');
const contactTypes = require('../data/contactTypes.json');

OrganizationSchema.plugin(mongoosePaginate);

var OrganizationModel = mongoose.model('organizations', OrganizationSchema);

OrganizationModel.getOrganizations = async () => {
    var query = OrganizationModel.find();
    for (var contactType of contactTypes) {
        query.populate({
            path: `contacts.${contactType}.audience`,
            model: 'audiences'
        });
    }
    return await query.exec();
};

OrganizationModel.getOrganizationsByPage = async (page, limit) => {
    var audiencePaths = [];
    for (var contactType of contactTypes) {
        audiencePaths.push({
            path: `contacts.${contactType}.audience`,
            model: 'audiences'
        });
    }
    return await OrganizationModel.paginate(
        {},
        { page: page, limit: limit, populate: audiencePaths }
    );
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
