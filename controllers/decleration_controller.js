//
// Decleration controller
//

const db = require('../config/db');
const ApiError = require('../models/ApiError');


module.exports = {
    postDecleration(request, response, next) {
        try {
            const mrn = request.body.mrn;
            
        } catch (error) {
            throw(new ApiError(error.toString(), 412))
        }
    },

    //function to update status in the database
    setDecleration(req, res, next){
        try{
            const mrn = req.parms.mrn || '';
            const status = req.body.status;

            assert(mrn !== '', 'MRN was not defined or passed as empty');
            assert(typeof(mrn) === 'string', 'MRN is not of type string');
            assert(status > 0, 'status not defined or passed as empty');

            db.query('UPDATE declaration SET status=' + status + 'WHERE mrn ="' + mrn + '"', (err, rows, fields) => {
                if(err){
                    next(new ApiError(500, err.message));
                }else{
                    res.sendStatus(200).json(rows[0]).end();
                }
            });
        } catch (error){
            next(new ApiError(412, error.message));
        }

    }
};
