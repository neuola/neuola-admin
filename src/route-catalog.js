/*jslint eqeq: true, indent: 2, node: true, plusplus: true, regexp: true, unparam: true, vars: true, nomen: true */
'use strict';

var router = module.exports = require('express').Router();
var mw = require('./middleware');
var model = require('neuola-data');

router.route('/create').get(mw.toPage('catalog-create')).post(function (req, res) {
  var rawCatalog = req.param('catalog');
  if (rawCatalog) {
    var catalog = new model.Catalog(rawCatalog);
    catalog.save(function (err, doc) {
      if (err) {
        res.render('error', err);
      } else {
        res.render('catalog-create-done', doc);
      }
    });
  } else {
    res.render('invalid');
  }
});

router.route('/update/:id').get(mw.toPage('catalog-update')).post(function (req, res) {
  var id = req.param('id');
  var rawCatalog = req.param('catalog');
  if (id && rawCatalog) {
    var q = model.Catalog.findByIdAndUpdate(id, rawCatalog);
    q.exec().then(function (doc) {
      res.render('catalog-update-done', doc);
    }, res.render.bind(res, 'error'));
  } else {
    res.render('invalid');
  }
});

router.route('/delete/:id').get(function (req, res) {
  var id = req.param('id');
  if (id) {
    var q = model.Catalog.findByIdAndRemove(id);
    q.exec().then(function (doc) {
      res.render('catalog-delete-done', doc);
    }, res.render.bind(res, 'error'));
  } else {
    res.render('invalid');
  }
});

router.route('/browse').all(function (req, res) {
  var q = model.Catalog.find();
  q.exec().then(function (docs) {
    res.render('catalog-list-latest', {catalogs: docs});
  }, res.render.bind(res, 'error'));
});
