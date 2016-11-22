
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

function Controllerindex(data,key){

}
Controllerindex.prototype.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()){
        res.send(true);
    }else{
        res.send(false)
    }
}
Controllerindex.prototype.logout = function(req, res, next) {
    req.logout();
    res.send(true);
}

module.exports = new Controllerindex();