//
// Decleration controller
//

let decleration = require('./models/decleration');
const assert = require('assert');
const db = require('../config/db');
const ApiError = require('../models/ApiError');


module.exports = {
    postDecleration(request, response, next) {
        try {
            const accountID = request.body.accountID;
            const companyID = request.body.companyID;
            const mrn = request.body.mrn;
            const status = request.body.status;
            const reference = request.body.reference;
            const receiver = request.body.receiver;
            const client = request.body.client;
            const numberOfProducts = request.body.numberOfProducts;
            const totalAmount = request.body.totalAmount;
            const currency = request.body.currency;
            const totalWeight = request.body.totalWeight;
            const datetime = request.body.datetime;

            assert(typeof (companyID) === 'int', 'companyID voornaam must be an int')
            assert(typeof (accountID) === 'int', 'accountID must be an int')
            assert(typeof (mrn) === 'string', 'mrn must be a string')
            assert(typeof (status) === 'int', 'status must be an int')
            assert(typeof (reference) === 'string', 'reference must be an string')
            assert(typeof (receiver) === 'string', 'receiver must be a string')
            assert(typeof (client) === 'string', 'client must be a string')
            assert(typeof (numberOfProduct) === 'int', 'numberOfProduct must be a int')
            assert(typeof (totalAmount) === 'double', 'totalAmount must be a double')
            assert(typeof (currency) === 'string', 'currency must be a string')
            assert(typeof (totalWeight) === 'int', 'totalWeight must be a int')
            assert(typeof (date) === 'date', 'receiver must be a date')

            db.query('CALL postDecleration (?,?,?,?,?,?,?,?,?,?,?,?)', [accountID, companyID, mrn, status, reference, sender, receiver, client, numberOfProducts, totalAmount, currency, totalWeight, datetime], (error, rows, fields) => {
                if (error) {
                    next(new ApiError(500, error.message));
                } else {
                    const row = rows[0][0];
                    switch (row.result) {
                        case 0:
                            next(new ApiError(401, 'You are not authorized to update this declaration'));
                            break;
                        case 1:
                            response.status(200).json({}).end();
                            break;
                    }
                }
            });
        } catch (error) {
            throw(new ApiError(error.toString(), 412));
        }
    },

    //function to update status in the database
    setDecleration(req, res, next){
        try{
            const mrn = req.parms.mrn || '';
            const status = req.body.status;

            try{
                expect(status).to.be.oneOf([-1, 0, 1, 8, 13, 18, 22, 25, 36, 37]);
                expect(mrn).to.be.a('string');
                expect(mrn).to.not.to.be.empty;
            }catch (ex){
                const error = new ApiError(ex.toString(), 422);
                next(error);
                return
            }

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
}
