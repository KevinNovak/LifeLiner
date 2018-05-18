const Schema = require('mongoose').Schema;
const audienceValidator = require('../validators/audienceValidator');
const regex = require('../data/regex');

const numberPattern = new RegExp(
    `(${regex.phone.shortCode.source}|${regex.phone.longCode.source})`
);

var TextSchema = new Schema(
    {
        number: {
            type: String,
            match: [numberPattern, 'Phone number to text is not valid.'],
            required: [true, 'Phone number to text is required.']
        },
        phrase: {
            type: String,
            minlength: [1, 'Text phrase is too short.'],
            maxlength: [50, 'Text phrase is too long.']
        },
        audiences: {
            type: [Schema.Types.ObjectId],
            ref: 'Audience',
            validate: {
                validator: audienceValidator.audienceIdsExist,
                isAsync: true,
                message: 'Audiences are invalid. Check that the audiences exist.'
            },
            default: void 0
        }
    },
    { _id: false }
);

module.exports = TextSchema;
