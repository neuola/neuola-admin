/*jslint eqeq: true, indent: 2, node: true, plusplus: true, regexp: true, unparam: true, vars: true, nomen: true */
'use strict';

var express = require('express');
var os = require('os');

require('tingodb');
var app = express();

// Application configuration
app.set('env', 'development');
app.set('view cache', false);
app.set('json spaces', true);

// Log all requests.
app.use(require('./src/middleware').log);

// Mount the neuola-admin module.
app.use(require('./src')({
  // it's buggy yet.
  db: 'tingodb://' + require('path').join(os.tmpdir(), '/neuola-data-tingodb')
}));

// Only start listening on 3000 when this file is run directly.
if (!module.parent) {
  // Start an application running at port 3000.
  app.listen(3000);

  console.log('Server is running at 3000');
} else {
  module.exports = app;
}
