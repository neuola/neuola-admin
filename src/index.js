/*jslint eqeq: true, indent: 2, node: true, plusplus: true, regexp: true, unparam: true, vars: true, nomen: true, forin: true */
'use strict';

var express = require('express');
var stylus = require('stylus');
var middleware = require('./middleware');

// default settings.
var defaults = {
  'env': 'development',
  'trust proxy': false,
  'jsonp callback name': '?callback=',
  'json replacer': null,
  'json spaces': true,
  'case sensitive routing': true,
  'strict routing': false,
  'view cache': true,
  'view engine': 'jade',
  'views': process.cwd() + '/views'
};

/**
 * The exported function to expose an [Express][] context. The accepted parameters will be used as [Express][] context's configuration.
 *
 * [Express]: http://expressjs.com "The Express.js framework."
 */
module.exports = function application(params) {
  var app = express();

  // Evironment Settings
  (function () {
    var attr;
    for (attr in defaults) {
      if (params[attr]) {
        app.set(attr, params[attr]);
      } else {
        app.set(attr, defaults[attr]);
      }
    }
    // Set the default view engine.
    app.engine('jade', require('jade').__express);
  }());

  // Log the visited pages on console.
  app.use(middleware.log);

  // Administration routes.
  app.use('/article', require('./route-article'));
  app.use('/catalog', require('./route-catalog'));
  app.use('/message', require('./route-message'));

  // Dashboard.
  app.get('/', function (req, res) {
    // FIXME the dashboard page.
  });

  app.use(stylus.middleware({
    src: process.cwd() + '/stylus',
    dest: process.cwd() + '/public',
    compress: false,
    debug: true
  }));

  app.use(express['static']('/public'));

  // Render a 404 page if pages does not match any pattern.
  app.use(middleware.toPage('404.jade'));

  return app;
};
