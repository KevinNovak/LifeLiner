const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const config = require('./config.json');

const apiPort = config.api.port;

// Connect to database
mongoose.connect(config.database.connection).catch((error) => {
    console.error('Unable to connect to database.');
    console.error(error.message);
});

// Setup API
var app = express();
app.use(bodyParser.json());
app.use('/', routes);

// Start server
var server = app.listen(apiPort, () => {
    console.log(`API started on port ${apiPort}`);
});

process.on('unhandledRejection', (error) => {
    console.error('A promise rejection was unhandled.');
    console.error(error.message);
});
