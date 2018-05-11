const Schema = require('mongoose').Schema;

const CallSchema = require('./call');
const TextSchema = require('./text');
const ChatSchema = require('./chat');

var ContactsSchema = new Schema(
    {
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
    },
    { _id: false }
);

module.exports = ContactsSchema;
