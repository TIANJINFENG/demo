/**
 * Created by dell on 16-11-14.
 */
/**
 * Created by dell on 16-9-21.
 */
var mongodb = require('./db');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

function User() {
    this.name = ''
}
module.exports = User;
User.get = function (date, callback) {
    mongodb.close();
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('user', function (err, collection) {
            if (err) {
                console.log('---------qwe--------');
                mongodb.close();
                console.log('---------asd--------');
                return callback(err);//错误，返回 err 信息
            }
                    collection.find({
                        password: "1"
                    }, function (err, user) {
                        console.log('---------zxc--------');
                        mongodb.close();
                        console.log('---------tyu--------');
                        if (err) {
                            return done(err);//失败！返回 err 信息
                        }
                        // if (!user) {
                        //     return done(null, false, { message: '用户名不存在.' });
                        // }
                        // if (!user.validPassword(password)) {
                        //     return done(null, false, { message: '密码不匹配.' });
                        // }
                        console.log('---------hjk--------');
                        return done(null, user);
                        // console.log(user)
                        //callback(null, user);//成功！返回查询的用户信息
                    });

        });
    });
};
