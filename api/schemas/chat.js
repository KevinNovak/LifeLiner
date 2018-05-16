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
            validate: {
                validator: audienceValidator.audienceIdsExist,
                isAsync: true,
                message: 'Audience is invalid. Check that the audience exists.'
            },
            default: void 0
        }
    },
    { _id: false }
);

module.exports = ChatSchema;
