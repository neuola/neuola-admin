/*jslint eqeq: true, indent: 2, node: true, plusplus: true, regexp: true, unparam: true, vars: true, nomen: true, forin: true */
'use strict';

var Router = require('express').Router;
var stylus = require('stylus');
var mw = require('./middleware');

// default settings.
var defaults = {
  'env': 'development'
};

/**
 * The exported function to expose an [Express][] context. The accepted parameters will be used as [Express][] context's configuration.
 *
 * [Express]: http://expressjs.com "The Express.js framework."
 */
module.exports = function application(config) {
  var app = new Router();

  // Administration routes.
  app.use('/article', require('./route-article'));
  app.use('/catalog', require('./route-catalog'));
  app.use('/message', require('./route-message'));

  // Dashboard.
  app.use('/', require('./route-dashboard'));

  // Render a 404 page if pages does not match any pattern.
  app.use(mw.toPage('404.jade'));

  return app;
};
