var path = require('path');

module.exports = function filterByExtension(expectedExtension) {
  return function compare(value) {
    return expectedExtension === path.extname(value).substr(1);
  };
};
