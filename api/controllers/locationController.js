const LocationModel = require('../models/location');
const language = require('../data/language.json');

async function getLocations(request, response) {
    try {
        var locations = await LocationModel.getLocations();
        response.status(200).json(locations);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            error: language.errors['500']
        });
    }
}

module.exports = {
    getLocations
};
