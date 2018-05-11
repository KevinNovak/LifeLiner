const Schema = require('mongoose').Schema;
const ContactsSchema = require('./contacts');

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
            required: [true, 'Organization contacts are required.']
        }
    },
    { versionKey: false }
);

module.exports = OrganizationSchema;
