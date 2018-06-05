//
// Decleration class
//

class Decleration {

    constructor(ID, accountID, declarationID, latitude, longitude, timestamp){

        try {
        assert(typeof (ID) === 'int', 'ID voornaam must be an int')
        assert(typeof (accountID) === 'int', 'accountID must be an int')
        assert(typeof (declarationID) === 'int', 'declarationID must be an int')
        assert(typeof (latitude) === 'int', 'latitude must be an int')
        assert(typeof (longtitude) === 'int', 'longtitude must be an int')
        assert(typeof (timestamp) === 'string', 'timestamp must be a timestamp') //?????
            } catch (error) {
                throw(new ApiError(error.toString(), 422))
            }

        this.accountID = accountID
        this.ID = ID
        this.declarationID = declarationID
        this.latitude = latitude
        this,longitude = longitude
        this.timestamp = timestamp
    }
}
