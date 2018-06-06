//
// Decleration routes
//

const express = require('express');
const declaration_controller = require('../controllers/declaration_controller');
let routes = express.Router();

// The router endpoints that we provide
routes.post('/decleration',declaration_controller.postDecleration);
routes.put('/decleration/:mrn',declaration_controller.setDeclaration);


// Exporting the routes so they can be used by the other classes
module.exports = routes;