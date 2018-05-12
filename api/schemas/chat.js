const Schema = require('mongoose').Schema;
const audiences = require('../data/audiences.json');

var ChatSchema = new Schema(
    {
        url: {
            type: String,
            required: true
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
