'use strict';

require('mocha');
var assert = require('assert');
var update = require('update');
var updater = require('./');
var app;

describe('apicrudbasicgeek', function() {
  beforeEach(function() {
    app = update();
  });

  describe('plugin', function() {
    it('should add tasks to the instance', function() {
      app.use(updater);
      assert(app.tasks.hasOwnProperty('default'));
      assert(app.tasks.hasOwnProperty('apicrudbasicgeek'));
    });

    it('should only register the plugin once', function(cb) {
      var count = 0;
      app.on('plugin', function(name) {
        if (name === 'apicrudbasicgeek') {
          count++;
        }
      });
      app.use(updater);
      app.use(updater);
      app.use(updater);
      assert.equal(count, 1);
      cb();
    });
  });
});