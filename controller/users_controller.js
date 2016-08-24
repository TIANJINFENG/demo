var AV = require('../AV');
var http_key = require('../util/http_key_request')

function Controller_users(){}

var App = AV.Object.extend('App');

Controller_users.prototype.users = function(req,res){

    res.render('users', {title:"index",reqs:req})

}

Controller_users.prototype.create_app = function(req,res){

    http_key( function(data){

        var app = new App();

        app.set('name',req.body.app_name);

        app.set('userid',req.body.user_id)

        app.set('token',data)

        app.save().then(function (todo) {

        }, function (error) {

            console.log(error);
        });
        console.log(data)
    })

    res.redirect("/users")
}
Controller_users.prototype.isLoggedIn = function(req, res, next) {

    if (req.isAuthenticated())

        return next();

    res.redirect('/');

}

module.exports = new Controller_users();