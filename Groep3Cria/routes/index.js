/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Express' });
};
exports.restDemo = function (req, res) {
    res.render('restDemo', { title: 'Express' });
};

/* Make sure we export all routes */
var fs = require('fs')
    , path = require('path');

fs.readdirSync(__dirname).forEach(function (file) {
    var route_fname = __dirname + '/' + file;
    var route_name = path.basename(route_fname, '.js');
    if (route_name !== 'index' && route_name[0] !== ".") {
        exports[route_name] = require(route_fname)[route_name];
    }
});