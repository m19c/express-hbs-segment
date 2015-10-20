var defaults = require('lodash.defaults');
var clone = require('lodash.clone');
var dispatch = require('./dispatch');
var defaultOptions = {
  cwd: process.cwd(),
  handlebars: null,
  directories: [],
  raiseError: false
};
var config;

module.exports.configure = function configure(options) {
  module.exports.config = config = defaults(options || {}, {
    handlebars: require('express-hbs')
  }, defaultOptions);

  if (!config.handlebars.registerAsyncHelper) {
    throw new Error('The passed configuration "handlebars" does not contain the method "registerAsyncHelper". Did you pass "handlebars" instead of "express-hbs"?');
  }

  config.handlebars.registerAsyncHelper('segment', function segment(context, done) {
    var hash = clone(context.hash);
    var id = hash.id;

    delete hash.id;

    dispatch(id, hash, config)
      .then(done)
      .catch(function handleError(err) {
        if (config.raiseError) {
          throw err;
        }

        done(err.message);
      })
    ;
  });
};
