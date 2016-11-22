'use strict';

var passport = require('./../passport/passport');

var index_controller = require('./../controller/index_controller');

module.exports = function (app) {
    var bind = function (accepter, method) {
        return accepter[method].bind(accepter);
    };

    app.post('/login', passport.authenticate('local', {}), function (req, res) {
        console.log('走过mongodb了')
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(req.cookies));
    });

    app.get('/users', bind(index_controller, "isLoggedIn"));
    app.get('/logout', bind(index_controller, "logout"));

}

