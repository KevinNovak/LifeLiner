const Schema = require('mongoose').Schema;
const audiences = require('../data/audiences.json');

var TextSchema = new Schema(
    {
        number: {
            type: String,
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
