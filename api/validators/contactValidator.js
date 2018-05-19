const contactTypes = require('../data/contactTypes.json');

function validateContacts(contacts) {
    for (var contactType of contactTypes) {
        if (contacts[contactType] && contacts[contactType].length > 0) {
            return true;
        }
    }
    return false;
}

module.exports = {
    validateContacts
};
