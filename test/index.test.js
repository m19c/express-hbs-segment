var segment = require('../');
var hbs = require('express-hbs');

describe('index', function indexTest() {
  it('throws an error if the obtained handlebars instance does not contain the function "registerAsyncHelper"', function invalidHbsInstanceTest() {
    (function generateError() {
      segment.configure({
        handlebars: {}
      });
    }).should.throw('The passed configuration "handlebars" does not contain the method "registerAsyncHelper". Did you pass "handlebars" instead of "express-hbs"?');
  });

  it('should register the helper "segment"', function segmentRegisteredTest() {
    segment.configure({
      handlebars: hbs
    });

    hbs.handlebars.helpers.should.have.property('segment');
  });

  it('the config object is available', function configPresentTest() {
    segment.configure();
    segment.config.should.be.a.Object();
  });

  describe('functional', function functionalGroup() {
    before(function runBefore() {
      hbs.express4({});
    });

    it('works', function workTest() {
      var template;
      var result;

      segment.configure({
        handlebars: hbs,
        raiseError: true
      });

      template = hbs.compile('{{{segment id="greeter"}}}');
      result = template();

      result.should.match(/__aSyNcId_(.*)__/);
    });

    it('fails', function failTest(done) {
      var template;
      var isDone;

      segment.configure({
        handlebars: hbs,
        raiseError: true
      });

      template = hbs.compile('{{{segment id="failed"}}}');
      template();

      process.on('unhandledRejection', function(err) {
        err.message.should.equal('Cannot find segment "failed"');

        if (!isDone) {
          isDone = true;
          done();
        }
      });
    });

    it('returns the error message as the segment result', function failedResultTest() {
      var template;
      var result;

      segment.configure({
        handlebars: hbs
      });

      template = hbs.compile('{{{segment id="failed"}}}');
      result = template();

      result.should.match(/__aSyNcId_(.*)__/);
    });
  });
});
