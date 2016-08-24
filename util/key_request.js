var http = require("http");

var url = require("url");

var key = require('../key')

var request = function (callback) {

    var strUrl = "http://192.168.1.31:8080/tyk/keys/create";

    var parse = url.parse(strUrl);

    console.log(parse)

    var options = {
        "method" : "POST",
        "host"   : parse.hostname,
        "path"   : parse.path,
        "port"   : parse.port,
        "headers": {
            'Content-Type': 'application/json',

            "x-tyk-authorization":"352d20ee67be67f6340b4c0605b044b7"
        }
    }

    var req=http.request(options, function(res){

        res.setEncoding("utf-8");

        var resData = "";

        console.log("dsfsdfsd")

        res.on("data", function(chunk){

            console.log("QWEQEQWEQWE")

            resData+=chunk;

        }).on("end", function(){
            var access= JSON.parse(resData);
            //console.log(access.key)
            callback != undefined && callback(access.key);
        });
    });

    req.write(JSON.stringify(key))

    req.end()
}
module.exports = request;