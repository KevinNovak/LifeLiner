const Schema = require('mongoose').Schema;
const ContactsSchema = require('./contacts');
const LocationSchema = require('./location');
const contactValidator = require('../validators/contactValidator');
const locationValidator = require('../validators/locationValidator');
const regex = require('../data/regex');

var OrganizationSchema = new Schema(
    {
        name: {
            type: String,
            minlength: [2, 'Organization name is too short.'],
            maxlength: [80, 'Organization name is too long.'],
            required: [true, 'Organization name is required.']
        },
        website: {
            type: String,
            match: regex.url,
            required: [true, 'Organization website is required.']
        },
        contacts: {
            type: ContactsSchema,
            validate: {
                validator: contactValidator.validateContacts,
                message: 'Contacts section requires at least one contact.'
            },
            required: [true, 'Organization contacts are required.']
        },
        locations: {
            type: [Schema.Types.ObjectId],
            ref: 'Location',
            validate: {
                validator: locationValidator.locationIdsExist,
                isAsync: true,
                message:
                    'Locations are invalid. Check that the locations exist.'
            },
            default: void 0
        }
    },
    { versionKey: false }
);

module.exports = OrganizationSchema;
