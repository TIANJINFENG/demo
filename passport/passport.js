
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var AV = require('../AV');

passport.use( new LocalStrategy(
    function (username, password, done) {

        AV.User.logIn(username, password).then(function (user) {

            return done(null, user);

        }, function (error){

            console.log('*******************')

            return done(null, false, { message: 'Incorrect .' })
            // 可以配置通过数据库方式读取登陆账号
        });
    }
));

passport.serializeUser(function (user, done) {//保存user对象

    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象

    done(null, user);//可以通过数据库方式操作
});



module.exports = passport