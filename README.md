# gulp-forever-monitor
Forever deamon for gulp. You can use this deamon without watching unlike nodemon.
# Install 
`npm install gulp-forever-monitor`
# Example
```js
var gulp = require('gulp');
var forever = require('gulp-forever-monitor');

gulp.task('run:server', function() {
  var foreverMonitorOptions = { 
    env: process.env,
    args: process.argv,
    watch: true, // can pass if you set any watch option, for example watchIgnorePatterns
    watchIgnorePatterns:  ['.*', 'node_modules/**', 'public/**', 'temp/**']
  }
  
  forever('server.js', foreverMonitorOptions)  
  .on('watch:restart', function(fileInfo) { 
    console.log('server was restarted');          
  })
  .on('exit', function() {
    console.log('server was closed');
  })
})
```
Module return forever-monitor stream. You can use all its functions.

