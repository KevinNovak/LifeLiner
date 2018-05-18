const LocationModel = require('../models/location');
const locationsValidator = require('../validators/locationsValidator');
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

async function getLocation(request, response) {
    try {
        var id = request.params.id;
        var location = await LocationModel.getLocation(id);
        if (!location) {
            response.status(404).json({
                error: `Could not find location with ID: ${id}.`
            });
        } else {
            response.status(200).json(location);
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            error: language.errors['500']
        });
    }
}

async function addLocation(request, response) {
    try {
        var locationToAdd = request.body;
        var location = await LocationModel.addLocation(locationToAdd);
        response.status(201).json(location);
    } catch (error) {
        console.log(error.name);
        console.log(error.code);
        if (
            error.name == 'ValidationError' ||
            error.message.includes('E11000')
        ) {
            response.status(400).json({
                error: error.message
            });
        } else {
            console.log(error.message);
            response.status(500).json({
                error: language.errors['500']
            });
        }
    }
}

async function updateLocation(request, response) {
    try {
        var id = request.params.id;
        var update = request.body;
        var location = await LocationModel.updateLocation(id, update);
        if (!location) {
            response.status(404).json({
                error: `Could not find location with ID: ${id}.`
            });
        } else {
            response.status(200).json(location);
        }
    } catch (error) {
        if (
            error.name == 'ValidationError' ||
            error.message.includes('E11000')
        ) {
            response.status(400).json({
                error: error.message
            });
        } else {
            console.log(error.message);
            response.status(500).json({
                error: language.errors['500']
            });
        }
    }
}

async function removeLocation(request, response) {
    try {
        var id = request.params.id;
        if (await locationsValidator.locationIdUsed(id)) {
            response.status(403).json({
                error: `The ID: ${id} is currently being used.`
            });
        } else {
            var location = await LocationModel.removeLocation(id);
            if (!location) {
                response.status(404).json({
                    error: `Could not find location with ID: ${id}.`
                });
            } else {
                response.status(200).json(location);
            }
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            error: language.errors['500']
        });
    }
}

module.exports = {
    getLocations,
    getLocation,
    addLocation,
    updateLocation,
    removeLocation
};