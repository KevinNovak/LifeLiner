const Schema = require('mongoose').Schema;
const audienceValidator = require('../validators/audienceValidator');
const regex = require('../data/regex');

var CallSchema = new Schema(
    {
        number: {
            type: String,
            match: [regex.phone.longCode, 'Phone number is not valid.'],
            required: [true, 'Phone number to call is required.']
        },
        audience: {
            type: [String],
            validate: {
                validator: audienceValidator.validateAudiences,
                isAsync: true,
                message: 'Audience is invalid. Check that the audience exists.'
            },
            default: void 0
        }
    },
    { _id: false }
);

module.exports = CallSchema;
