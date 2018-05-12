const Schema = require('mongoose').Schema;
const ContactsSchema = require('./contacts');
const contactsValidator = require('../validators/contactsValidator');

var OrganizationSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Organization name is required.']
        },
        website: {
            type: String,
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
