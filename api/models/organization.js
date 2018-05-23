const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const OrganizationSchema = require('../schemas/organization');
const contactTypes = require('../data/contactTypes.json');

OrganizationSchema.plugin(mongoosePaginate);

var OrganizationModel = mongoose.model('Organization', OrganizationSchema);

const populateOptions = [
    {
        path: 'locations',
        model: 'Location'
    }
];

for (contactType of contactTypes) {
    populateOptions.push({
        path: `contacts.${contactType}.audiences`,
        model: 'Audience'
    });
}

exports.getOrganizations = async (populate = false) => {
    var query = OrganizationModel.find();
    if (populate) {
        query.populate(populateOptions);
    }
    return await query.exec();
};

exports.getOrganizationsByPage = async (page, limit) => {
    return await OrganizationModel.paginate(
        {},
        { page: page, limit: limit, populate: populateOptions }
    );
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
    var ids = [];
    var objectIds = [];
    for (var contactType of contactTypes) {
        var results = await OrganizationModel.distinct(
            `contacts.${contactType}.audiences`
        ).exec();
        for (var result of results) {
            var id = result.toString();
            if (!ids.includes(id)) {
                ids.push(id);
                objectIds.push(result);
            }
        }
    }
    return objectIds;
};

exports.getLocationIds = async () => {
    return await OrganizationModel.distinct('locations').exec();
};

exports.Model = OrganizationModel;
