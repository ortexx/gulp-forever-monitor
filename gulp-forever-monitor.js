"use strict";

let forever = require('forever-monitor');
let fs = require('fs');
let path = require('path');

module.exports = function (source, options) {
  options = options || {};

  let child;
  let currentDir = options.sourceDir || '.';
  let watchIgnoreFile;
  let createForeverIgnore = false;

  if (options.max === undefined) {
    options.max = 1;
  }

  if (!options.watchIgnoreDotFiles) {
    options.watchIgnoreDotFiles = false;
  }

  if (options.watchIgnorePatterns || options.watchDirectory) {
    options.watch = true;
  }

  if (options.watch) {
    options.watchDirectory = options.watchDirectory || currentDir;
    watchIgnoreFile = path.join(options.watchDirectory, ".foreverignore");

    if (!fs.existsSync(watchIgnoreFile)) {
      fs.writeFileSync(watchIgnoreFile, '', 'utf-8');
      createForeverIgnore = true;
    }
  }

  child = new (forever.Monitor)(source, options);

  process.on('SIGINT', function () {
    process.exit();
  });

  process.on('SIGTERM', function () {
    process.exit();
  });

  process.on('exit', function () {
    if(createForeverIgnore) {
      try {
        fs.unlinkSync(watchIgnoreFile)
      }
      catch (err) {}
    }
    child.stop();
  });

  child.start();

  return child;
};
