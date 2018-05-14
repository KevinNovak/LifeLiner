const Schema = require('mongoose').Schema;

var AudienceSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            minlength: [2, 'Audience name is too short.'],
            maxlength: [50, 'Audience name is too long.'],
            required: [true, 'Audience name is required.']
        }
    },
    { versionKey: false }
);

module.exports = AudienceSchema;
