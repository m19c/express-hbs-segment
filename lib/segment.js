var Promise = require('bluebird');
var path = require('path');
var util = require('util');
var fs = require('mz/fs');
var filterByExtension = require('./util/filter-by-extension');
var cache = {};

function resolve(id, config) {
  var map = {};

  config.directories.forEach(function mapDirectories(directory) {
    if (!path.isAbsolute(directory)) {
      directory = path.join(process.cwd(), directory);
    }

    map[directory] = fs.exists(path.join(directory, id));
  });

  return Promise.props(map)
    .then(function checkDirectories(directories) {
      var directory;
      var isPresent;

      for (directory in directories) {
        if (!directories[directory]) {
          continue;
        }

        isPresent = directories[directory];

        if (isPresent) {
          return directory;
        }
      }

      return Promise.reject(new Error(util.format('Cannot find segment "%s"', id)));
    })
    .then(function readDirectory(directory) {
      return Promise.props({
        base: path.join(directory, id),
        files: fs.readdir(path.join(directory, id))
      });
    })
    .then(function extractInfo(info) {
      var controller;
      var view;

      function ensureSegmentId(value) {
        return id === path.basename(value, path.extname(value));
      }

      controller = info.files.filter(filterByExtension('js')).filter(ensureSegmentId).shift() || null;
      view = info.files.filter(filterByExtension('hbs')).filter(ensureSegmentId).shift() || null;

      if (!controller) {
        return Promise.reject(new Error(util.format('The segment "%s" does not contain a controller', id)));
      }

      if (!view) {
        return Promise.reject(new Error(util.format('The segment "%s" does not contain a view', id)));
      }

      return Promise.props({
        controller: require(path.join(info.base, controller)),
        view: fs.readFile(path.join(info.base, view), 'utf8')
      });
    })
    .then(function compileTemplate(spec) {
      spec.view = config.handlebars.compile(spec.view);

      return spec;
    })
  ;
}

module.exports = function segment(id, config, clean) {
  if (clean) {
    delete cache[id];
  }

  if (!cache[id]) {
    cache[id] = resolve(id, config);
  }

  return cache[id];
};
