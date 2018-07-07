import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseRoute', () => {
    it('should be json', () => {
        return chai.request(app).get('/')
                .then(res => {
                expect(res.type).to.eql('application/json');
        });
    });
    it('should have a message prop', () => {
        return chai.request(app).get('/')
            .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.eql('');
            expect(res.body.error).to.eql(false);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data.application).to.eql('AvatarGenerator');
            expect(res.body.data.platform).to.eql('Node.JS');
            expect(res.body.data.version).to.eql('1.0.0 ');
        });
    });
    it('health status', () => {
        return chai.request(app).get('/health')
            .then(res => {
                expect(res.type).to.eql('text/html');
                expect(res.body).to.be.empty;
            });
    });
});

describe('/v1/avatar', ()=>{
    it('shoud be avatar in json', () => {
        return chai.request(app).get('/v1/avatar/json?gender=M&name=rejk')
            .then(res => {
                expect(res.type).to.eql('application/json');
                expect(res.body.error).to.eql(false);
                expect(res.body.message).to.eql('');
                expect(res.body.data).to.be.an('string');
            });
    });

    it('json imam jej...', () => {
        return chai.request(app).get('/v1/avatar/?gender=M&name=rejk')
            .then(res => {
                expect(res.type).to.eql('text/html');
                expect(res.status).to.eql(200);
            });
    });

    //error on svg-s
    it('no params given', () => {
        return chai.request(app).get('/v1/avatar/?gender=M&name=')
            .then(res => {

            }).catch(res=>{
                expect(res.status).to.eql(400);
                expect(JSON.parse(res.response.error.text).error).to.eql(true);
                expect(JSON.parse(res.response.error.text).message).to.eql("Required gender and name in query params.");
            });
    });

    it('no params given', () => {
        return chai.request(app).get('/v1/avatar/?name=llds')
            .then(res => {

            }).catch(res=>{
                expect(res.status).to.eql(400);
                expect(JSON.parse(res.response.error.text).error).to.eql(true);
                expect(JSON.parse(res.response.error.text).message).to.eql("Required gender and name in query params.");
            });
    });

    it('bath path', () => {
        return chai.request(app).get('/v2/avatar/?name=llds')
            .then(res => {

            }).catch(res=>{
                console.log(JSON.parse(res.response.error.text).error);
                //console.log(res.error);

                expect(res.status).to.eql(404);
                expect(JSON.parse(res.response.error.text).error).to.eql(true);
                expect(JSON.parse(res.response.error.text).data).to.be.an('object');
            });
    });
    //

    describe('Post routa....v1/avatar/...', () => {
        it('shoud be ok F', () => {
            return chai.request(app).post('/v1/avatar').send({
                id: 1,
                name: 'uros',
                gender: 'F'
            })
                .then(res => {
                    expect(res.type).to.eql('application/json');
                    expect(res.status).to.eql(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.error).to.eql(false);
                    expect(res.body.message).to.eql('files generated');
                    expect(res.body.data).to.eql(null);
                });
        });

        it('shoud be ok M', () => {
            return chai.request(app).post('/v1/avatar').send({
                id: 1,
                name: 'jozefina',
                gender: 'M'
            })
                .then(res => {
                    expect(res.type).to.eql('application/json');
                    expect(res.status).to.eql(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.error).to.eql(false);
                    expect(res.body.message).to.eql('files generated');
                    expect(res.body.data).to.eql(null);
                });
        });

        it('shoud be ok LOL', () => {
            return chai.request(app).post('/v1/avatar').send({
                id: 1,
                name: 'nimoski in ni zenska',
                gender: 'Z'
            })
                .then(res => {
                    expect(res.type).to.eql('application/json');
                    expect(res.status).to.eql(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.error).to.eql(false);
                    expect(res.body.message).to.eql('files generated');
                    expect(res.body.data).to.eql(null);
                });
        });

        it('no user found', () => {
            return chai.request(app).post('/v1/avatar').send({
                id: -1,
                name: 'uros',
                gender: 'F'
            })
                .then(res => {


                }).catch(res=>{
                    expect(res.status).to.eql(404);
                    expect(JSON.parse(res.response.error.text).error).to.eql(true);
                    expect(JSON.parse(res.response.error.text).message).to.eql("No user found");
                    expect(JSON.parse(res.response.error.text).data).to.eql(null);
                });
        });

        it('no user found man', () => {
            return chai.request(app).post('/v1/avatar').send({
                id: -1,
                name: 'nekaj',
                gender: 'M'
            })
                .then(res => {


                }).catch(res=>{
                    expect(res.status).to.eql(404);
                    expect(JSON.parse(res.response.error.text).error).to.eql(true);
                    expect(JSON.parse(res.response.error.text).message).to.eql("No user found");
                    expect(JSON.parse(res.response.error.text).data).to.eql(null);
                });
        });

        it('no user found man', () => {
            return chai.request(app).post('/v1/avatar').send({
                id: 2,
                name: 'nekaj',
                gender: 'Z'
            })
                .then(res => {


                }).catch(res=>{
                    expect(res.status).to.eql(404);
                    expect(JSON.parse(res.response.error.text).error).to.eql(true);
                    expect(JSON.parse(res.response.error.text).message).to.eql("No user found");
                    expect(JSON.parse(res.response.error.text).data).to.eql(null);
                });
        });

        it('missing params in post gender', () => {
            return chai.request(app).post('/v1/avatar').send({
                id: 2,
                name: 'nekaj'

            })
                .then(res => {


                }).catch(res=>{
                    expect(res.status).to.eql(400);
                    expect(JSON.parse(res.response.error.text).error).to.eql(true);
                    expect(JSON.parse(res.response.error.text).message).to.eql("ID, name or gender not given in request");
                    expect(JSON.parse(res.response.error.text).data).to.eql(null);
                });
        });

        it('missing params in post name', () => {
            return chai.request(app).post('/v1/avatar').send({
                id: 2,
                gender: "Z"

            })
                .then(res => {


                }).catch(res=>{
                    expect(res.status).to.eql(400);
                    expect(JSON.parse(res.response.error.text).error).to.eql(true);
                    expect(JSON.parse(res.response.error.text).message).to.eql("ID, name or gender not given in request");
                    expect(JSON.parse(res.response.error.text).data).to.eql(null);
                });
        });

        it('missing params in post id', () => {
            return chai.request(app).post('/v1/avatar').send({
                name: 'nekaj',
                gender: 'Z'

            })
                .then(res => {


                }).catch(res=>{
                    expect(res.status).to.eql(400);
                    expect(JSON.parse(res.response.error.text).error).to.eql(true);
                    expect(JSON.parse(res.response.error.text).message).to.eql("ID, name or gender not given in request");
                    expect(JSON.parse(res.response.error.text).data).to.eql(null);
                });
        });

        it('missing all params in post request', () => {
            return chai.request(app).post('/v1/avatar').send({


            })
                .then(res => {


                }).catch(res=>{
                    expect(res.status).to.eql(400);
                    expect(JSON.parse(res.response.error.text).error).to.eql(true);
                    expect(JSON.parse(res.response.error.text).message).to.eql("ID, name or gender not given in request");
                    expect(JSON.parse(res.response.error.text).data).to.eql(null);
                });
        });

    });

});