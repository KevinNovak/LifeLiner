const bodyParser = require('body-parser');

// Body parser middleware and catch errors
var customBodyParser = (request, response, next) => {
    bodyParser.json()(request, response, (error) => {
        if (error) {
            var message = error.message;
            console.error('Body parser error.');
            console.error(message);
            response.status(400).json({ error: message });
            return;
        }
        next();
    });
};

module.exports = customBodyParser;
