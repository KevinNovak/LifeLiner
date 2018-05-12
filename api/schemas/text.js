const Schema = require('mongoose').Schema;
const audiences = require('../data/audiences.json');
const regex = require('../data/regex');

const numberPattern = new RegExp(
    `(${regex.phone.longCode}|${regex.phone.shortCode})`
);

var TextSchema = new Schema(
    {
        number: {
            type: String,
            match: [numberPattern, 'Phone number is not valid.'],
            required: [true, 'Phone number to text is required.']
        },
        phrase: {
            type: String
        },
        audience: {
            type: [String],
            enum: audiences,
            default: void 0
        }
    },
    { _id: false }
);

module.exports = TextSchema;
