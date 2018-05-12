const Schema = require('mongoose').Schema;
const audiences = require('../data/audiences.json');

var CallSchema = new Schema(
    {
        number: {
            type: String,
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
