/*jslint eqeq: true, indent: 2, node: true, plusplus: true, regexp: true, unparam: true, vars: true, nomen: true */
'use strict';

var router = module.exports = require('express').Router();
var mw = require('./middleware');
var model = require('neuola-data');

router.route('/create').get(mw.toPage('article-create')).post(function (req, res) {
  var rawPost = req.param('post');
  if (!rawPost) {
    res.render('invalid');
  } else {
    var post = new model.Post(rawPost);
    post.save(function (err, doc) {
      if (err) {
        res.render('error', err);
      } else {
        res.render('article-create-done', doc);
      }
    });
  }
});

router.route('/delete/:article').all(function (req, res) {
  var id = req.param('id');
  if (!id) {
    res.render('invalid');
  } else {
    var q = model.Post.findByIdAndRemove(id);
    q.exec().then(function (doc) {
      res.render('article-del', doc);
    }, res.render.bind(res, 'error'));
  }
});

router.route('/update/:article').get(mw.toPage('article-update')).post(function (req, res) {
  var rawPost = req.param('post');
  if (!rawPost) {
    res.render('invalid');
  } else {
    var q = model.Post.findbyIdAndUpdate(rawPost.id, rawPost);
    q.exec().then(function (doc) {
      res.render('article-update-done', doc);
    }, res.render.bind(res, 'error'));
  }
});

router.route('/browse/:tag').get(function (req, res) {
  var tagstr = req.params('tag'), tags;
  if (tagstr) {
    tags = tagstr.split(/,/);
  } else {
    tags = [];
  }
  var q = model.Post.listByTags(tags);
  q.exec().then(function (docs) {
    res.render('article-list-by-tags', {articles: docs});
  }, res.render.bind(res, 'error'));
});
