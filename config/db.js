//
// Configuratiebestand voor MySql database.
//
var mysql = require('mysql');
var config = require('../config/config.json');

const connectionSettings = {
    host: process.env.DB_SERVER,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
    debug: false
}
const reconnectTimeout = 2000; // ms.

var connection;

// http://sudoall.com/node-js-handling-mysql-disconnects/
function handleDisconnect() {
    connection = mysql.createConnection(connectionSettings);

    connection.connect(function (error) {
        if (error) {
            console.error('Error connecting to database ' + connectionSettings.database + ' on ' + connectionSettings.host + ': ' + error.message);
            connection.end();
            setTimeout(handleDisconnect, reconnectTimeout);
        } else {
            console.log('Connected to database ' + connectionSettings.database + ' on ' + connectionSettings.host + ', state = ' + connection.state);
        }
    });
    connection.on('error', function (error) {
        if (error.code === 'ECONNRESET') {
            console.error('Connection state = ' + connection.state + ' - reconnecting');
            connection.end();
            handleDisconnect();
        } else {
            console.error('Connection ERROR - database ' + connectionSettings.database + ' on ' + connectionSettings.host + ': ' + error.message);
            connection.end();
            handleDisconnect();
        }
    });
}

handleDisconnect();

module.exports = connection;