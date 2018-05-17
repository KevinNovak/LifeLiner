const Schema = require('mongoose').Schema;
const audiencesValidator = require('../validators/audiencesValidator');
const regex = require('../data/regex');

var ChatSchema = new Schema(
    {
        url: {
            type: String,
            match: [regex.url, 'Chat URL is not valid'],
            required: [true, 'Chat URL is required.']
        },
        audiences: {
            type: [Schema.Types.ObjectId],
            ref: 'Audience',
            validate: {
                validator: audiencesValidator.audienceIdsExist,
                isAsync: true,
                message: 'Audiences are invalid. Check that the audiences exist.'
            },
            default: void 0
        }
    },
    { _id: false }
);

module.exports = ChatSchema;
