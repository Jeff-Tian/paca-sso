'use strict';

let assert = require('assert'),
    request = require('co-supertest'),
    app = require('../app'),
    escape = require('escape-html');

require('co-mocha');

let server = app.listen();

describe('sso', function () {
    it('should be health', function *() {
        yield request(server)
            .get('/healthcheck')
            .send({})
            .expect(200)
            .expect(/OK/)
            .end();
    });

    // it('should create user', function *(){
    //     let data = {
    //         login: 'login test',
    //         password: 'secret'
    //     };
    //
    //     request(server)
    //
    // });
});