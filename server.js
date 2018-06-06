//
//Server
//
// Initiating all the neccessary modules
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/config.json')


// Include all config files
const db = require('./config/db');

//Include the routes
const declaration_routes = require('./routes/declaration_routes');

//  Setting up all the necessary variables used by the express library
//
// Deeper initiation
const app = express();
const port = process.env.PORT || config.webPort;

// Tell the express system to use morgan and bodyparser
app.use(morgan('dev'));
app.use(bodyparser.json());

//
//  All routing usages
//
// Parse all the requests regarding decleration.
app.use('/api,', declaration_routes);

//
//  Starting up the server on specified port
//
// Start the server on given port
app.listen(port, () => {
    console.log('De server draait op port ' + port)
});

//
//  Exporting the server for testing purposes
//
module.exports = app;