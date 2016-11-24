'use strict';

const config = require('../config/config')();
const monk = require('monk');
const db = monk(config.mongoUrl);
const wrap = require('co-monk');
const parse = require('co-body');
const User = require('../BLL/user');

let users = wrap(db.get('users'));

module.exports = function (app, route) {
    app.use(route.get('/api/connection', function*(next) {
        this.body = require('../config/config')().mongoUrl;
    }));
    app.use(route.put('/api/users', function *(next) {
        let user = yield parse(this);
        user.status = User.status.active;
        user.created_at = new Date;

        this.body = yield users.insert(user);
    }));
};