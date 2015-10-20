var segment = require('../lib/segment');

describe('segment', function() {
  it('rejects if the requested segment doesnt exist in the defined directories', function() {
    segment('example', { directories: ['a', 'b'] }).should.be.rejectedWith(new Error('Cannot find segment "example"'));
  });

  it('resolves if the requested segment is present (including a controller and a view file)', function() {
    segment('latest-news', { directories: ['example/segment'] }).should.be.fulfilled();
  });

  it('rejects if the controller is not present', function() {
    segment('segment-without-controller', { directories: [__dirname + '/resource'] }).should.be.rejectedWith(new Error('The segment "segment-without-controller" does not contain a controller'));
  });

  it('rejects if the view is not present', function() {
    segment('segment-without-view', { directories: [__dirname + '/resource'] }).should.be.rejectedWith(new Error('The segment "segment-without-view" does not contain a view'));
  });
});
