var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

module.exports = function latestNews(options) {
  return request.getAsync('http://jsonplaceholder.typicode.com/posts')
    .then(function(data) {
      var news = JSON.parse(data[1]);

      if (options.limit) {
        news = news.slice(0, options.limit);
      }

      return {
        news: news
      };
    })
  ;
};
