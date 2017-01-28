# gulp-forever-monitor
Forever deamon for gulp. Based on [forever-monitor](https://github.com/foreverjs/forever-monitor)

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
    watch: true, 
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

Module return forever-monitor stream. 

