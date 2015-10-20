var Promise = require('bluebird');
var names = ['Jon', 'Max', 'Marc', 'Snoop Dogg'];

module.exports = function greeter(options) {
  return new Promise(function(resolve) {
    process.nextTick(function() {
      resolve({ name: options.name || names[Math.random() * (names.length - 0) + 0] });
    });
  });
};
