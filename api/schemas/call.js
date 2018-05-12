const Schema = require('mongoose').Schema;
const audiences = require('../data/audiences.json');
const regex = require('../data/regex.json');

const numberPattern = RegExp(`^${regex.phone.longCode}$`);

var CallSchema = new Schema(
    {
        number: {
            type: String,
            match: [numberPattern, 'Phone number is not valid.'],
            required: [true, 'Phone number to call is required.']
        },
        audience: {
            type: [String],
            enum: audiences,
            default: void 0
        }
    },
    { _id: false }
);

module.exports = CallSchema;
