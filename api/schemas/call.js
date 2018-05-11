const Schema = require('mongoose').Schema;

var CallSchema = new Schema(
    {
        number: {
            type: String,
            required: true
        },
        audience: {
            type: [String],
            default: void 0
        }
    },
    { _id: false }
);

module.exports = CallSchema;
