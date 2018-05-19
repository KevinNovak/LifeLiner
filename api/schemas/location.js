const Schema = require('mongoose').Schema;

var LocationSchema = new Schema(
    {
        state: {
            type: String,
            required: true
        },
        city: {
            type: String
        },
        active: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    { versionKey: false }
);

module.exports = LocationSchema;
