'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String, /* message */
  desc: String,
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
  category: {
    type: String,
    default: 'Personal'    
  }
});
/*
ThingSchema.pre('find', function(next){
  this.populate('user', 'name');
  next();
});
ThingSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  next();
});*/

module.exports = mongoose.model('Thing', ThingSchema);
