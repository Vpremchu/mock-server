//
// Decleration controller
//

//let decleration = require('./models/decleration');
const assert = require('assert');
const db = require('../config/db');
const ApiError = require('../models/ApiError');
//var http = require('http');
const request = require('request');

module.exports = {
    postDecleration(req, res, next) {
        try {
            const accountID = req.body.accountID;
            const companyID = req.body.companyID;
            const mrn = req.body.mrn;
            const status = req.body.status;
            const reference = req.body.reference;
            const sender = req.body.sender;
            const receiver = req.body.receiver;
            const client = req.body.client;
            const numberOfProducts = req.body.numberOfProducts;
            const totalAmount = req.body.totalAmount;
            const currency = req.body.currency;
            const totalWeight = req.body.totalWeight;
            const datetime = req.body.datetime;
            let adresOrigin = req.body.adresOrigin;
            let adresDestination = req.body.adresDestination;

            assert(typeof (companyID) === 'int', 'companyID voornaam must be an int')
            assert(typeof (originID) === 'string', 'originID must be a int')
            assert(typeof (destinationID) === 'string', 'destinationID must be a int')
            //assert(typeof (accountID) === 'int', 'accountID must be an int')
            assert(typeof (mrn) === 'string', 'mrn must be a string')
            assert(typeof (status) === 'int', 'status must be an int')
            assert(typeof (reference) === 'string', 'reference must be an string')
            assert(typeof (sender) === 'string', 'sender must be a string')
            assert(typeof (receiver) === 'string', 'receiver must be a string')
            assert(typeof (client) === 'string', 'client must be a string')
            assert(typeof (numberOfProduct) === 'int', 'numberOfProduct must be a int')
            assert(typeof (totalAmount) === 'double', 'totalAmount must be a double')
            assert(typeof (currency) === 'string', 'currency must be a string')
            assert(typeof (totalWeight) === 'int', 'totalWeight must be a int')
            assert(typeof (datetime) === 'string', 'date must be a string')

            adresOrigin = adresOrigin.replace(/ /g,"+");
            request('https://maps.googleapis.com/maps/api/geocode/json?address=' + adresOrigin + '&key=AIzaSyDSl3BQHa64wfVOcUm6RdW7Me32EGDwpac', {json:true}, (errorAdresOrigin, resAdresOrigin, bodyAdresOrigin) => {
                if(errorAdresOrigin){
                    console.log(errorAdresOrigin)
                }else {
                    if(bodyAdresOrigin.status === 'OK'){
                        const locationOrigin = bodyAdresOrigin.results[0].geometry.location;
                        const latOrigin = locationOrigin.lat;
                        const lngOrigin = locationOrigin.lng;
                        adresDestination = adresDestination.replace(/ /g,"+");
                        request('https://maps.googleapis.com/maps/api/geocode/json?address=' + adresDestination + '&key=AIzaSyDSl3BQHa64wfVOcUm6RdW7Me32EGDwpac', {json:true}, (errorAdresDestination, resAdresDestination, bodyAdresDestination) => {
                            if(errorAdresDestination){
                                console.log(errorAdresDestination)
                            }else {
                                if(bodyAdresDestination.status === 'OK'){
                                    const locationDestination = bodyAdresDestination.results[0].geometry.location;
                                    const latDestination = locationDestination.lat;
                                    const lngDestination = locationDestination.lng;
                                    db.query('CALL postDeclaration (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [companyID, mrn, status, reference, sender, receiver, client, numberOfProducts, totalAmount, currency, totalWeight, datetime, adresOrigin, adresDestination, latOrigin, lngOrigin, latDestination, lngDestination], (errordb, rows, fields) => {
                                        if (errordb) {
                                            next(new ApiError(500, errordb.message));
                                        } else {
                                            const row = rows[0][0];
                                            switch (row.result) {
                                                case 0:
                                                    res.status(200).json({}).end();
                                                    break;
                                            }
                                        }
                                    });
                                }
                            }
                        })
                    }else{
                        next(new ApiError('no result were found, please try an other one.', 412))
                    }
                }
            })
        } catch (error) {
            throw(new ApiError(error.toString(), 412));
        }
    },

    //function to update status in the database
    setDeclaration(req, res, next){
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
