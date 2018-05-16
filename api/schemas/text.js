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
        audience: {
            type: [Schema.Types.ObjectId],
            ref: 'Audience',
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

module.exports = TextSchema;
