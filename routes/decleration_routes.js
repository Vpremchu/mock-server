//
// Decleration routes
//

const express = require('express');
const ChauffeurController = require('../controllers/decleration_controller');
let routes = express.Router();

// The router endpoints that we provide
routes.post('/decleration',decleration_controller.postDecleration);
routes.set('/decleration/:mrn',decleration_controller.setDecleration);


// Exporting the routes so they can be used by the other classes
module.exports = routes;