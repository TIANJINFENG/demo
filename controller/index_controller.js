//var http_key = require('../util/key_request');

var http_api = require('../util/create_api_request')

var http_visit_api = require('../util/visit_api')

var data = require('../data')

var key = require('../key')

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;


var user_data = require('../models/user_data');

function Controllerindex(data,key){

    //this.data = data;

    //this.key = key;

}

Controllerindex.prototype.index= function(req,res){
    res.render ('index')

}
Controllerindex.prototype.mongo= function(req,response){
    var a = req.body
    console.log(JSON.stringify(a));
    passport.authenticate('local', function(err, user, info) {
        console.log(user)
        if (err) { return next(err); }
        if (!user) { return res.redirect('/'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/users/' + user.username);
        });
    })(req, res, next);


    response.json("123213213213")
}
Controllerindex.prototype.logout= function(req,res){

    req.logout();

    res.redirect('/');
}

Controllerindex.prototype.dataBox = function(req,response){

    var strUrl = "http://192.168.1.31:8080/tyk/keys/create";

    http_api(key,strUrl, function(datas){

        response.json (datas)

    })
}

Controllerindex.prototype.create_api= function(req,response){

    var strUrl = "http://192.168.1.31:8080/tyk/apis/";

    http_api(data,strUrl,function(datas){

        response.json (datas)

    })
}
Controllerindex.prototype.visit_api= function(req,response){

    http_visit_api( function(datas){

        response.json (datas)

    })
}
module.exports = new Controllerindex();