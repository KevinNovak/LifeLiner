const OrganizationModel = require('../models/organization');
const LocationModel = require('../models/location');

async function locationIdUsed(locationId) {
    var locationIds = await OrganizationModel.getLocationIds();
    if (locationIds.includes(locationId)) {
        return true;
    }
    return false;
}

async function locationIdsExist(locationIds) {
    for (var locationId of locationIds) {
        var count = await LocationModel.Model.count({ _id: locationId });
        if (count < 1) {
            return false;
        }
    }
    return true;
}

module.exports = {
    locationIdUsed,
    locationIdsExist
};
