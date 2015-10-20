var segment = require('./segment');

module.exports = function dispatch(id, hash, config) {
  var spec;

  return segment(id, config)
    .then(function handle(info) {
      spec = info;
      return spec.controller(hash);
    })
    .then(function render(data) {
      return spec.view(data);
    })
  ;
};
