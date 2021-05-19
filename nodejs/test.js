'use strict';

require('mocha');
var assert = require('assert');
var apicrudbasicgeek = require('./');

describe('apicrudbasicgeek', function() {
  it('should export a function', function() {
    assert.equal(typeof apicrudbasicgeek, 'function');
  });

  it('should export an object', function() {
    assert(apicrudbasicgeek);
    assert.equal(typeof apicrudbasicgeek, 'object');
  });

  it('should throw an error when invalid args are passed', function() {
    assert.throws(function() {
      apicrudbasicgeek();
    });
  });

});