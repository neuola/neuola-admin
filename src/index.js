var express = require('express');
var stylus = require('stylus');
var util = require('util');

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
  for (var attr in defaults) {
    if (params[attr]) {
      app.set(attr, params[attr]);
    } else {
      app.set(attr, defaults[attr]);
    }
  }
  // Set the default view engine.
  app.engine('jade', require('jade').__express);

  // Log the visited pages on console.
  app.use(util.log);

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
    compress: true,
    debug: true
  }));

  app.use(express.static('/public'));

  // Render a 404 page if pages does not match any pattern.
  app.use(function (req, res) {
    res.send('404 Not found!');
  });

  return app;
}
