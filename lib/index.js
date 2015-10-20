var defaults = require('lodash.defaults');
var clone = require('lodash.clone');
var dispatch = require('./dispatch');
var defaultOptions = {
  cwd: process.cwd(),
  handlebars: null,
  directories: []
};
var config;

module.exports.configure = function configure(options) {
  config = defaults(options || {}, defaultOptions);

  if (!config.handlebars.registerAsyncHelper) {
    throw new Error('The passed handlebars instance does not contain the method "registerAsyncHelper". Did you pass the "handlebars" instance instead of the "express-hbs" instance?');
  }

  config.handlebars.registerAsyncHelper('segment', function segment(context, done) {
    var hash = clone(context.hash);
    var id = hash.id;

    delete hash.id;

    dispatch(id, hash)
      .then(done)
      .catch(function(err) {
        throw err;
      })
    ;
  });
};
