const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Declaration code handling', function (){
    it('should return status 200 when declaration is added', done => {
        chai.request(server)
            .post('/api/declaration')
            .send({
                'companyID':25,
                'originID':14,
                'destinationID':30,
                'mrn':'63NL21685301325KV4',
                'status':0,
                'sender':'Avans',
                'reference':'CARGO023',
                'receiver':'Luison',
                'client':'Luison BV',
                'numberOfProduct':5,
                'currency':'POUND',
                'totalAmount':623.00,
                'totalWeight':60,
                'date':'2018-06-06 13:46:26'
            }).end((error, response)=> {
                response.should.have.status(200)
                response.body.should.be.a('object')

                let res = response.body.result[0]
                res.should.have.property('companyID')
                res.should.have.property('originID')
                res.should.have.property('destinationID')
                res.should.have.property('mrn')
                res.should.have.property('status')
                res.should.have.property('sender')
                res.should.have.property('reference')
                res.should.have.property('receiver')
                res.should.have.property('client')
                res.should.have.property('numberOfProduct')
                res.should.have.property('currency')
                res.should.have.property('totalAmount')
                res.should.have.property('totalWeight')
                res.should.have.property('date')

                done();
            })
    })

    it('')

    it('should return a valid object with valid status', (done) => {
        chai.request(server)
            .put('/api/declaration/17NL21903719321341')
            .send({
                status: '1'
            }).end((error, response) => {
            response.should.have.status(200);
            response.should.be.a('object');

            done();
        });
    });

    it('should return a 422 eror when an invalid status is presented', (done) => {
        chai.request(server)
            .put('/api/declaration/17NL21903719321341')
            .send({
                status: '100'
            }).end((error, response) => {
            response.should.have.status(422);
            response.should.be.a('object');

            done();
        });
    });
});
