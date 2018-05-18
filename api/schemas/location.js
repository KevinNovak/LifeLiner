const Schema = require('mongoose').Schema;

var LocationSchema = new Schema(
    {
        state: {
            type: String,
            required: true
        },
        city: {
            type: String
        }
    },
    { versionKey: false }
);

module.exports = LocationSchema;
