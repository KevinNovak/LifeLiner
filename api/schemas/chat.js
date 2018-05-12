const Schema = require('mongoose').Schema;
const audiences = require('../data/audiences.json');
const regex = require('../data/regex');

var ChatSchema = new Schema(
    {
        url: {
            type: String,
            match: [regex.url, 'Chat URL is not valid'],
            required: [true, 'Chat URL is required.']
        },
        audience: {
            type: [String],
            enum: audiences,
            default: void 0
        }
    },
    { _id: false }
);

module.exports = ChatSchema;
