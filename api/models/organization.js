const mongoose = require('mongoose');

var callSchema = mongoose.Schema(
    {
        number: {
            type: String,
            required: true
        },
        audience: {
            type: [String]
        }
    },
    { _id: false }
);

var textSchema = mongoose.Schema(
    {
        number: {
            type: String,
            required: true
        },
        phrase: {
            type: String
        },
        audience: {
            type: [String]
        }
    },
    { _id: false }
);

var chatSchema = mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },
        audience: {
            type: [String]
        }
    },
    { _id: false }
);

var schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        website: {
            type: String,
            required: true
        },
        contacts: {
            call: {
                type: [callSchema]
            },
            text: {
                type: [textSchema]
            },
            chat: {
                type: [chatSchema]
            }
        }
    },
    { versionKey: false }
);

var model = mongoose.model('organizations', schema);

model.getOrganizations = (callback) => {
    model.find(callback);
};

model.getOrganizationById = (id, callback) => {
    model.findById(id, callback);
};

model.addOrganization = (organization, callback) => {
    model.create(organization, callback);
};

module.exports = model;
