var forever = require('forever-monitor');
var fs = require('fs');
var path = require('path');

module.exports = function (source, options) {       
    var child,
        currentDir = options.sourceDir || '.',
        watchIgnoreFile; 
    
    if(options.max === undefined) {
        options.max = 1;
    }
    
    if(!options.watchIgnoreDotFiles) {
        options.watchIgnoreDotFiles = false; 
    }
    
    if(options.watchIgnorePatterns) {
        options.watch = true;
    }
    
    if(options.watch) {  
        options.watchDirectory = options.watchDirectory || currentDir;
        watchIgnoreFile = path.join(options.watchDirectory, ".foreverignore");  
        
        if(!fs.existsSync(watchIgnoreFile)) { 
            fs.writeFileSync(watchIgnoreFile, '', 'utf-8'); 
        }
    }
    
    child = new (forever.Monitor)(source, options);
        
    child.on('stderr', function(err) {
        console.log(err.toString());
    });
    
    process.on('SIGINT', function() {
        process.exit(); 
    });
        
    process.on('SIGTERM', function() {
        process.exit(); 
    });
    
    process.on('exit', function() { 
        child.stop();      
    });
    
    child.start();  
    
    return child;
}
