const Schema = require('mongoose').Schema;
const audiencesValidator = require('../validators/audiencesValidator');
const regex = require('../data/regex');

var CallSchema = new Schema(
    {
        number: {
            type: String,
            match: [regex.phone.longCode, 'Phone number is not valid.'],
            required: [true, 'Phone number to call is required.']
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

module.exports = CallSchema;
