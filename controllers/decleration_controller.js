//
// Decleration controller
//

const db = require('../config/db');

module.exports = {
    postDecleration(request, response, next) {
        try {
            const mrn = request.body.mrn;
            
        } catch (error) {
            throw(new ApiError(error.toString(), 412))
        }
    }
}
