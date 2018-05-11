const express = require('express');
const config = require('./config.json');

const port = config.port;

// Setup API
var app = express();

app.get('/', (request, response) => {
    response.send('<h1>LifeLine</h1>');
});

// Start server
var server = app.listen(port, () => {
    console.log(`LifeLiner started on port ${port}`);
});

process.on('unhandledRejection', (error) => {
    console.error('A promise rejection was unhandled.');
    console.error(error.message);
});
