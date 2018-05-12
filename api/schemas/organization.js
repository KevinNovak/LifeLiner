const Schema = require('mongoose').Schema;
const ContactsSchema = require('./contacts');
const contactsValidator = require('../validators/contactsValidator');
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
                validator: contactsValidator.validateContacts,
                message: 'Contacts section requires at least one contact.'
            },
            required: [true, 'Organization contacts are required.']
        }
    },
    { versionKey: false }
);

module.exports = OrganizationSchema;
