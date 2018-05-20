const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const OrganizationSchema = require('../schemas/organization');
const contactTypes = require('../data/contactTypes.json');

OrganizationSchema.plugin(mongoosePaginate);

var OrganizationModel = mongoose.model('Organization', OrganizationSchema);

exports.getOrganizations = async () => {
    return OrganizationModel.find().exec();
};

exports.getOrganizationsByPage = async (page, limit) => {
    return await OrganizationModel.paginate({}, { page: page, limit: limit });
};

exports.getOrganization = async id => {
    return await OrganizationModel.findById(id).exec();
};

exports.addOrganization = async organization => {
    return await OrganizationModel.create(organization);
};

exports.updateOrganization = async (id, update) => {
    return await OrganizationModel.findByIdAndUpdate(id, update, {
        runValidators: true,
        new: true
    }).exec();
};

exports.removeOrganization = async id => {
    return await OrganizationModel.findByIdAndRemove(id).exec();
};

exports.getAudienceIds = async () => {
    var audienceIds = [];
    for (var contactType of contactTypes) {
        audienceIds = audienceIds.concat(
            (await OrganizationModel.distinct(
                `contacts.${contactType}.audiences`
            ).exec()).map(id => id.toString())
        );
    }
    return Array.from(new Set(audienceIds));
};

exports.getLocationIds = async () => {
    return await OrganizationModel.distinct('locations').exec();
};

exports.Model = OrganizationModel;
