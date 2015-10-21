var EventEmitter = require('eventemitter2').EventEmitter2;
var defaults = require('lodash.defaults');
var clone = require('lodash.clone');
var dispatch = require('./dispatch');
var ee = new EventEmitter();
var defaultOptions = {
  cwd: process.cwd(),
  handlebars: null,
  directories: [],
  raiseError: false
};
var config;

module.exports.on = ee.on;
module.exports.off = ee.off;
module.exports.once = ee.once;

module.exports.configure = function configure(options) {
  var toRaise;

  module.exports.config = config = defaults(options || {}, {
    handlebars: require('express-hbs')
  }, defaultOptions);

  if (!config.handlebars.registerAsyncHelper) {
    toRaise = new Error('The passed configuration "handlebars" does not contain the method "registerAsyncHelper". Did you pass "handlebars" instead of "express-hbs"?');
    ee.emit('error', toRaise);
    throw toRaise;
  }

  config.handlebars.registerAsyncHelper('segment', function segment(context, done) {
    var hash = clone(context.hash);
    var id = hash.id;

    delete hash.id;

    dispatch(id, hash, config)
      .then(done)
      .catch(function handleError(err) {
        ee.emit('error', err);

        if (config.raiseError) {
          throw err;
        }

        done(err.message);
      })
    ;
  });
};
