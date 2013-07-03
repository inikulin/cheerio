var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

var mocha = new Mocha({
    reporter: 'dot'
});


fs.readdirSync('./test').filter(function (file) {
    return file.substr(-3) === '.js';

}).forEach(function (file) {
        mocha.addFile(path.join('./test', file));
    });

mocha.run(function (report) {
    console.log(report);
});