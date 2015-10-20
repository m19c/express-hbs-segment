var Promise = require('bluebird');

module.exports = function dispatch(id, hash, config) {
  console.log(id, config);
  return new Promise(function(resolve) {
    process.nextTick(function() {
      resolve(hash.limit);
    });
  });
};
