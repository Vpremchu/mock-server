const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Declaration code handling', function (){
    it('', (done) => {
        chai.request(server)
            .put('/api/decleration')
            .send({
                status: '1'
            })
    });
});