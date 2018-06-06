//
// Decleration routes
//

const express = require('express');
const decleration_controller = require('../controllers/decleration_controller');
let routes = express.Router();

// The router endpoints that we provide
routes.post('/decleration',decleration_controller.postDecleration);
routes.put('/decleration/:mrn',decleration_controller.setDecleration);


// Exporting the routes so they can be used by the other classes
module.exports = routes;