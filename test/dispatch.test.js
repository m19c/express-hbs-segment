var hbs = require('express-hbs');
var dispatch = require('../lib/dispatch');

describe('dispatch', function dispatchTest() {
  it('rejectes if the segment is not present', function segmentNotPresentTest() {
    dispatch('does-not-exist', {}, {
      directories: [__dirname + '/resource']
    }).should.be.rejectedWith('Cannot find segment "does-not-exist"');
  });

  it('pipes the error from the controller', function pipeTheErrorTest() {
    dispatch('error-producer', {}, {
      handlebars: hbs,
      directories: [__dirname + '/resource']
    }).should.be.rejectedWith('I am the error producer');
  });

  it('uses the given options', function useTheGivenOptionTest() {
    dispatch('greeter', { name: 'Marc' }, {
      handlebars: hbs,
      directories: [__dirname + '/resource']
    }).should.be.fulfilledWith('Hi Marc!');
  });
});
