const Schema = require('mongoose').Schema;

var ChatSchema = new Schema(
    {
        url: {
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

module.exports = ChatSchema;
