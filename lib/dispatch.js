var Promise = require('bluebird');

module.exports = function dispatch(id, config) {
  console.log(id, config);
  return new Promise(function(resolve) {
    process.nextTick(function() {
      resolve('1337');
    });
  });
};
