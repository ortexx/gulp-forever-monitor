﻿"use strict";

const forever = require('forever-monitor');
const fs = require('fs');
const path = require('path');
const onExit = require('signal-exit');

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
  onExit(function () {
    if(createForeverIgnore) {
      try {
        fs.unlinkSync(watchIgnoreFile);
      }
      catch (err) {
        err.code != 'ENOENT' && console.warn(err.stack);
      }
    }
    child.stop();
  });
  child.start();
  return child;
};
