/*jslint eqeq: true, indent: 2, node: true, plusplus: true, regexp: true, unparam: true, vars: true, nomen: true */
'use strict';

var router = module.exports = require('express').Router();

/* The overview page */
router.route('/').get(function (req, res) {
  res.render('dashboard');
});
