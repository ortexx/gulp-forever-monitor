const fs = require('fs-extra');
const path = require('path');

if(!fs.existsSync(path.join(__dirname, 'tmp', 'source.txt'), 'utf8')) {
  fs.ensureFileSync(path.join(__dirname, 'tmp', 'source.txt'));
  fs.writeFileSync(path.join(__dirname, 'tmp', 'source.txt'), 'test');
  fs.ensureFileSync(path.join(__dirname, 'watch', 'source.txt'));
  fs.writeFileSync(path.join(__dirname, 'watch', 'source.txt'), 'test');
}