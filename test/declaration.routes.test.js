const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Declaration code handling', function (){
    it('should return a valid object with valid status', (done) => {
        chai.request(server)
            .put('/api/decleration/17NL21903719321341')
            .send({
                status: '1'
            }).end((error, response) => {
            response.should.have.status(200);
            response.should.be.a('object');
        });
        done();
    });

    it('should return a 422 eror when an invalid status is presented', (done) => {
        chai.request(server)
            .put('/api/decleration/17NL21903719321341')
            .send({
                status: '100'
            }).end((error, response) => {
            response.should.have.status(422);
            response.should.be.a('object');
        });
        done();
    });
});
