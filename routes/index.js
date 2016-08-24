
var passport = require('./../controller/passport');

var index_controller = require('./../controller/index_controller');

var users_controller = require('./../controller/users_controller');

//
//var http = require("http");
//var url = require("url");

//var data = require('../data');
/*var key = require('../key')
//var AV = require('./../controller/AV');

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
        console.log(access.key)
    });
});
req.write(JSON.stringify(key))

req.end()*/

/*var strUrl = "http://192.168.1.31:8080/test-api/";

var parse = url.parse(strUrl);

 console.log(parse)
 // 待发送的数据
 var options = {
 "method" : "GET",
 "host"   : parse.hostname,
 "path"   : parse.path,
 "port"   : parse.port,
 "headers": {

     "Authorization":"57ac445e40ab1e0001000004e859e4e2a7e341804669df6dfe26168a"
 }
 };
 var req = http.request(options, function(res){

 res.setEncoding("utf-8");

 console.log("@@@@@@@@@@@@######")

 var resData = "";

 res.on("data", function(chunk){
 //console.log(chunk)
 resData += chunk;

 }).on("end", function(){

     console.log(resData);
 });
 });
 //req.write(JSON.stringify(data));
 req.end();*/

/*var strUrl = "http://139.129.221.136:8081/tyk/apis/";
var parse = url.parse(strUrl);
console.log(parse)
// 待发送的数据
var options = {
    "method" : "POST",
    "host"   : parse.hostname,
    "path"   : parse.path,
    "port"   :parse.port,
    //"query:":"b0398b95563741c07b52242f1a3c55c5",
    "headers": {

        'Content-Type': 'application/json',
        "x-tyk-authorization":"352d20ee67be67f6340b4c0605b044b7",

    }
};
var req = http.request(options, function(res){

    res.setEncoding("utf-8");
    console.log("@@@@@@@@@@@@######")
    var resData = "";
    res.on("data", function(chunk){
        console.log(chunk)
        resData += chunk;
    }).on("end", function(){
        console.log(JSON.stringify(resData));
    });
});
req.write(JSON.stringify(data));
req.end();*/

module.exports = function(app) {

    var bind = function (accepter, method) {

        return accepter[method].bind(accepter);

    };
    app.get('/',bind(index_controller,"index"));

    app.post('/', passport.authenticate('local', {successRedirect: '/users', failureRedirect: '/'}));

    app.all('/users', bind(users_controller,"isLoggedIn"));

    app.get('/users',bind(users_controller,"users"));

    app.post('/users', bind(users_controller,"create_app"))

    app.get('/logout', bind(index_controller,"logout"));

    app.get('/dataBox', bind(index_controller,"dataBox"));

    app.get('/create_api', bind(index_controller,"create_api"));

    app.get('/visit_api', bind(index_controller,"visit_api"));


}

