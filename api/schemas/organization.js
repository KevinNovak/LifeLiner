const Schema = require('mongoose').Schema;
const CallSchema = require('./call');
const TextSchema = require('./text');
const ChatSchema = require('./chat');

var OrganizationSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        website: {
            type: String,
            required: true
        },
        contacts: {
            call: {
                type: [CallSchema],
                default: void 0
            },
            text: {
                type: [TextSchema],
                default: void 0
            },
            chat: {
                type: [ChatSchema],
                default: void 0
            }
        }
    },
    { versionKey: false }
);

module.exports = OrganizationSchema;
