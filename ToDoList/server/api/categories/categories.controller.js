'use strict';

var _ = require('lodash');
var Categories = require('./categories.model');

// Get list of categoriess
exports.index = function(req, res) {
  Categories.find(function (err, categoriess) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(categoriess);
  });
};

// Get a single categories
exports.show = function(req, res) {
  Categories.findById(req.params.id, function (err, categories) {
    if(err) { return handleError(res, err); }
    if(!categories) { return res.status(404).send('Not Found'); }
    return res.json(categories);
  });
};

// Creates a new categories in the DB.
exports.create = function(req, res) {
  Categories.create(req.body, function(err, categories) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(categories);
  });
};

// Updates an existing categories in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Categories.findById(req.params.id, function (err, categories) {
    if (err) { return handleError(res, err); }
    if(!categories) { return res.status(404).send('Not Found'); }
    var updated = _.merge(categories, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(categories);
    });
  });
};

// Deletes a categories from the DB.
exports.destroy = function(req, res) {
  Categories.findById(req.params.id, function (err, categories) {
    if(err) { return handleError(res, err); }
    if(!categories) { return res.status(404).send('Not Found'); }
    categories.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}