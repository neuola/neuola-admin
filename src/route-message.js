/*jslint eqeq: true, indent: 2, node: true, plusplus: true, regexp: true, unparam: true, vars: true, nomen: true */
'use strict';

var router = module.exports = require('express').Router();
var mw = require('./middleware');
var model = require('neuola-data');

router.route('/create').get(mw.toPage('msg-create')).post(function (req, res) {
  var rawMsg = req.param('msg');
  rawMsg.from = req.user._id;
  if (rawMsg) {
    var msg = model.Message(rawMsg);
    msg.save().exec().then(function (doc) {
      req.render('msg-create-done', doc);
    }, res.render.bind(res, 'error'));
  } else {
    res.render('invalid');
  }
});

router.route('/update/:msg').get(mw.toPage('msg-update')).post(function (req, res) {
  var rawMsg = req.param('msg');
  var q = model.Message.findByIdAndUpdate(rawMsg._id, {content: rawMsg.content});
  q.exec().then(function (doc) {
    res.render('msg-update-done', doc);
  }, res.render.bind(res, 'error'));
});

router.route('/delete/:msg').all(function (req, res) {
  var id = req.param('msg');
  var q = model.Message.findByIdAndRemove(id);
  q.exec().then(function (doc) {
    res.render('msg-delete-done', doc);
  }, res.render.bind(res, 'error'));
});

router.route('/browse').all(function (req, res) {
  var q = model.Message.listLatestMessages(req.user._id);
  q.exec().then(function (docs) {
    res.render('msg-list-latest', docs);
  }, res.render.bind(res, 'error'));
});

router.route('/received').all(function (req, res) {
  var q = model.Message.listByReceiver(req.user._id);
  q.exec().then(function (docs) {
    res.render('msg-sent', {msgs: docs});
  }, res.render.bind(res, 'error'));
});

router.route('/sent').all(function (req, res) {
  var q = model.Message.listBySender(req.user._id);
  q.exec().then(function (docs) {
    res.render('msg-received', {msgs: docs});
  }, res.render.bind(res, 'error'));
});
