var hbs = require('express-hbs');
var segment = require('../lib/segment');

describe('segment', function segmentTest() {
  it('rejects if the requested segment doesnt exist in the defined directories', function segmentNotFoundTest() {
    segment('example', {
      directories: ['a', 'b'],
      handlebars: hbs
    }).should.be.rejectedWith('Cannot find segment "example"');
  });

  it('resolves if the requested segment is present (including a controller and a view file)', function segmentFoundTest() {
    segment('latest-news', {
      directories: ['example/segment'],
      handlebars: hbs
    }).should.be.fulfilled();
  });

  it('rejects if the controller is not present', function segmentControllerNotFoundTest() {
    segment('segment-without-controller', {
      directories: [__dirname + '/resource'],
      handlebars: hbs
    }).should.be.rejectedWith('The segment "segment-without-controller" does not contain a controller');
  });

  it('rejects if the view is not present', function segmentViewNotFoundTest() {
    segment('segment-without-view', {
      directories: [__dirname + '/resource'],
      handlebars: hbs
    }).should.be.rejectedWith('The segment "segment-without-view" does not contain a view');
  });

  it('flushs the cache if the third argument contains true', function flushCacheTest(done) {
    var first;

    function determine(flushCache) {
      return segment('latest-news', {
        directories: ['example/segment'],
        handlebars: hbs
      }, flushCache);
    }

    determine()
      .then(function(spec) {
        first = spec;
        return determine(true);
      })
      .then(function(spec) {
        if (first.view !== spec.view) {
          return done();
        }

        done(new Error('Expect another compiled instance of the view'));
      })
      .catch(done)
    ;
  });
});
