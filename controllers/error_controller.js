const ApiError = require('../models/ApiError');

module.exports = {
    // function used for processing a non existing endpoint
    endpointNotFound(request, response, next) {
        //Sending errors info to the Final errors Handler
        next(new ApiError('Endpoint could not be found', 404));
    },
    // function used for processing errors
    errorHandling(error, request, response, next) {
        console.log('[ERROR]  An ' + error.code + ' error has occured: ' + error.message);

        response.status(error.code).json(error).end();
    }
};