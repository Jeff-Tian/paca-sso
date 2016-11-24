'use strict';

let koa = require('koa'),
    parse = require('co-body'),
    html = require('html'),
    colors = require('colors');

let app = koa();

function log(content) {
    content = html.prettyPrinting(content, {indent_size: 4});
    console.log(content.blue.gbWhite);
}

app.use(function *controller() {
    this.body = 'hello world';
});

module.exports = app;