
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var mongodb = require('../models/db');

var AV = require('../AV');
function user(data,callback) {
    var users = {
        username:"1",
        password:"1"
    };
    mongodb.close()
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);//错误，返回 err 信息
            }
            //将用户数据插入 users 集合
            collection.insert(users, {
                safe: true
            }, function (err, users) {
                db.close();
                if (err) {
                    return callback(err);//错误，返回 err 信息
                }
                callback(null, users[0]);//成功！err 为 null，并返回存储后的商品文档
            });
        });
    });
};
function user_add(name, callback) {
    mongodb.close()
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            console.log('-----------ces-------------------')
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);//错误，返回 err 信息
            }
            var query = {};
            if (name) {
                query.username = name;
            }
            collection.find(query).sort({

            }).toArray(function (err, add) {
                db.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                callback(null, add);//成功！返回查询的商品信息
            });
        });
    });
};
// var a = "1"
// user_add(a,function(err,users){
//     if(err){
//         users = []
//     }
//     console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\')
//     console.log(users)
//     console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\')
// })
// user(null,function(err,users){
//     if(err){
//         users = []
//     }
//     console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\')
//     console.log(users)
//     console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\')
// })
passport.use( new LocalStrategy(
    // usernameField: 'username',
    // passwordField: 'password'
// },
     function (username,password,done) {
         console.log(username)
         console.log(password)
        mongodb.close();
        mongodb.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            db.collection('users', function (err, collection) {
                if (err) {
                    console.log('---------qwe--------');
                    db.close();
                    console.log('---------asd--------');
                    return done(err);
                }
                var query = {};
                if (username) {
                    query.username = username;
                }
                collection.find(query).sort({

                }).toArray( function (err, users) {
                    console.log('---------zxc--------');
                    db.close();
                    console.log('---------tyu--------');
                    if (err) {
                        return done(err);//失败！返回 err 信息
                    }
                    console.log(users)
                    console.log('---------hjk--------');
                    return done(null, users[0]);
                });
            });
        });
        // AV.User.logIn(username, password).then(function (user) {
        //
        //     return done(null, user);
        //
        // }, function (error){
        //
        //     console.log('*******************')
        //
        //     return done(null, false, { message: 'Incorrect .' })
        //     // 可以配置通过数据库方式读取登陆账号
        // });
     }
));

passport.serializeUser(function (user, done) {//保存user对象
    console.log("============================")
    console.log(user)
    console.log("============================")
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    console.log("++++++++++++++++++++++++++++++")
    console.log(user)
    console.log("++++++++++++++++++++++++++++++")
    done(null, user);
});



module.exports = passport
