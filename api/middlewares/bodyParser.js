const bodyParser = require('body-parser');

// Body parser middleware and catch errors
var customBodyParser = (request, response, next) => {
    bodyParser.json()(request, response, (error) => {
        if (error) {
            response.status(400).json({ error: error.message });
            return;
        }
        next();
    });
};

module.exports = customBodyParser;
