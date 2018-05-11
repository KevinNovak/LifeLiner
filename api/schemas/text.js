const Schema = require('mongoose').Schema;

var TextSchema = new Schema(
    {
        number: {
            type: String,
            required: true
        },
        phrase: {
            type: String
        },
        audience: {
            type: [String],
            default: void 0
        }
    },
    { _id: false }
);

module.exports = TextSchema;
