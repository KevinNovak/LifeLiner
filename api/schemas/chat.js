const Schema = require('mongoose').Schema;
const audienceValidator = require('../validators/audienceValidator');
const regex = require('../data/regex');

var ChatSchema = new Schema(
    {
        url: {
            type: String,
            match: [regex.url, 'Chat URL is not valid'],
            required: [true, 'Chat URL is required.']
        },
        audience: {
            type: [Schema.Types.ObjectId],
            ref: 'audiences',
            default: void 0
        }
    },
    { _id: false }
);

module.exports = ChatSchema;
