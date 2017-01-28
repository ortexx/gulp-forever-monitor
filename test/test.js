"use strict";

const assert = require('chai').assert;
const monitor = require('../gulp-forever-monitor');
const fs = require('fs-extra');
const path = require('path');

function clear() {
  fs.removeSync(path.join(__dirname, 'tmp'));
  fs.removeSync(path.join(__dirname, 'watch'));
}

function create() {
  fs.ensureDirSync(path.join(__dirname, 'tmp'));
  fs.ensureDirSync(path.join(__dirname, 'watch'));
}

describe('GulpForeverMonitor:', function () {
  beforeEach(function() {
    clear();
    create();
  });

  after(function() {
    clear();
  });

  it('check without watching', function (done) {
    monitor(path.join(__dirname, 'app.js')).on('exit', function() {
      let file = fs.readFileSync(path.join(__dirname, 'tmp', 'source.txt'), 'utf8');
      assert.equal(file, 'test');
      done();
    });
  });

  it('check with watching', function (done) {
    let restarted = false;

    monitor(path.join(__dirname, 'app.js'), {
      args: process.argv,
      watchDirectory: path.join(__dirname, 'watch'),
      watchIgnorePatterns:  ['.*', 'node_modules/**', 'public/**', 'temp/**']
    }).on('watch:restart', function() {
      restarted = true;
    }).on('exit', function() {
      if(restarted) {
        done();
      }
    });
  });
});

