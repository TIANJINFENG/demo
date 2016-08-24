var http = require("http");
var url = require("url");
var unirest = require('unirest');
var data = require('../data');
var key = require('../key')

var request = function (url, options, callback) {

    data = options.data || {};

    var content = require('querystring').stringify(data);

    var parse_u = require('url').parse(url, true);

    var isHttp = parse_u.protocol == 'http:';

    var options = {

        host: parse_u.hostname,

        port: parse_u.port || (isHttp ? 80 : 443),

        path: parse_u.path,

        method: options.method,

        headers: options.headers

    };
    var req = require(isHttp ? 'http' : 'https').request(options, function (res) {

        var _data = '';

        res.on('data', function (chunk) {

            _data += chunk;

        });

        res.on('end', function () {

            callback != undefined && callback(_data);

        });
    });
    req.write(content);
    req.end();
};

module.exports = request;