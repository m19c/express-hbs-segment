var Promise = require('bluebird');

module.exports = function errorProducer() {
  return new Promise(function(resolve, reject) {
    reject(new Error('I am the error producer'));
  });
};
