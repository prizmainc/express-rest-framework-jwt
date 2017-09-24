let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);


describe('/POST authenticate', () => {
    it('admin,user roles authenticate', (done) => {
        let userFrom = {
            username: "hudson",
            password: "1"
        };

        chai.request(app).post('/authenticate')
            .send(userFrom)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('token');

                let adminURLCalled = false;
                let userURLCalled = false;

                chai.request(app).get('/admin').set('Authorization', 'Bearer ' + res.body.token).end((err, res) => {
                    res.should.have.status(200);
                    adminURLCalled = true;
                    if(userURLCalled && adminURLCalled){
                        done();
                    }
                });

                chai.request(app).get('/user').set('Authorization', 'Bearer ' + res.body.token).end((err, res) => {
                    res.should.have.status(200);
                    userURLCalled = true;
                    if(userURLCalled && adminURLCalled){
                        done();
                    }
                });

            });
    });

    it('admin roles authenticate', (done) => {
        let userFrom = {
            username: "hugo",
            password: "1"
        };

        chai.request(app).post('/authenticate')
            .send(userFrom)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('token');

                let adminURLCalled = false;
                let userURLCalled = false;

                chai.request(app).get('/admin').set('Authorization', 'Bearer ' + res.body.token).end((err, res) => {
                    res.should.have.status(200);
                    adminURLCalled = true;
                    if(userURLCalled && adminURLCalled){
                        done();
                    }
                });

                chai.request(app).get('/user').set('Authorization', 'Bearer ' + res.body.token).end((err, res) => {
                    res.should.have.status(403);
                    userURLCalled = true;
                    if(userURLCalled && adminURLCalled){
                        done();
                    }
                });

            });
    });

    it('user roles authenticate', (done) => {
        let userFrom = {
            username: "michel",
            password: "1"
        };

        chai.request(app).post('/authenticate')
            .send(userFrom)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('token');

                let adminURLCalled = false;
                let userURLCalled = false;

                chai.request(app).get('/admin').set('Authorization', 'Bearer ' + res.body.token).end((err, res) => {
                    res.should.have.status(403);
                    adminURLCalled = true;
                    if(userURLCalled && adminURLCalled){
                        done();
                    }
                });

                chai.request(app).get('/user').set('Authorization', 'Bearer ' + res.body.token).end((err, res) => {
                    res.should.have.status(200);
                    userURLCalled = true;
                    if(userURLCalled && adminURLCalled){
                        done();
                    }
                });

            });
    });

});