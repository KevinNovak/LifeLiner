const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const OrganizationSchema = require('../schemas/organization');
const contactTypes = require('../data/contactTypes.json');

OrganizationSchema.plugin(mongoosePaginate);

var OrganizationModel = mongoose.model('Organization', OrganizationSchema);

OrganizationModel.getOrganizations = async () => {
    return OrganizationModel.find().exec();
};

OrganizationModel.getOrganizationsByPage = async (page, limit) => {
    return await OrganizationModel.paginate({}, { page: page, limit: limit });
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

OrganizationModel.getAudienceIds = async () => {
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

module.exports = OrganizationModel;
