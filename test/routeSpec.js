'use strict';

process.env.PACA_MODE = 'test';

let assert = require('assert'),
    request = require('co-supertest'),
    app = require('../app'),
    childProcess = require('child_process');

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

    it('should in test mode', function *() {
        yield request(server)
            .get('/env')
            .send({})
            .expect(200)
            .expect({
                mode: 'test',
                port: 10001,
                mongoUrl: 'mongodb://localhost:27017/paca-sso-test'
            })
            .end();
    });

    describe('database related', function () {
        beforeEach(function () {
        });

        afterEach(function () {
            childProcess.execSync('mongo paca-sso-test --eval "db.dropDatabase()"', function (err, stdout, stderr) {
                if (err) {
                    console.log(err);
                    throw err;
                }
            });
        });

        it('should create user', function *() {
            let data = {
                login: 'login test',
                password: 'secret'
            };

            yield request(server)
                .put('/api/users')
                .send(data)
                .expect(200)
                .expect(/{"login":"login test","password":"secret","status":0,/)
                .end();
        });
    });

});