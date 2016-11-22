var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var mongodb = require('../models/db');

function user(data, callback) {
    var users = {
        username: "1",
        password: "1"
    };
    mongodb.close()
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('users', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            collection.insert(users, {
                safe: true
            }, function (err, users) {
                db.close();
                if (err) {
                    return callback(err);
                }
                callback(null, users[0]);
            });
        });
    });
};

function query_user_data(username, password, done) {
    mongodb.close();
    mongodb.open(function (err, db) {
        if (err) {
            return done(err);
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
                query.username = username,
                    query.password = password
            }
            collection.find(query).sort({}).toArray(function (err, users) {
                console.log('---------zxc--------');
                db.close();
                console.log('---------tyu--------');
                if (err) {
                    return done("false");
                }
                console.log(users[0])
                console.log('---------hjk--------');
                done(null, users[0]);
            });
        });
    });
};

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("开始查询mongodb--------------------------------")
        mongodb.close();
        mongodb.open(function (err, db) {
            if (err)  return done(err);
            db.collection('users', function (err, collection) {
                if (err) {
                    db.close();
                    return done(err);
                }
                var query = {};
                if (username) {
                    query.username = username,
                        query.password = password
                }
                collection.find(query).sort({}).toArray(function (err, users) {
                    db.close();
                    if (err) return done(null, "false");//失败！返回 err 信息
                    console.log("查询mongodb中-------------------------------------")
                    return done(null, users[0]);
                });
            });
        });
    }
));

passport.serializeUser(function (user, done) {
    console.log("查询完mongodb了--------------------------------------")
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    var username = user.username
    var password = user.username
    query_user_data(username, password, done)
});


module.exports = passport
