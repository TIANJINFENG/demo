var AV = require('../AV');
var http_key = require('../util/key_request')
var data = require('../data')
var key = require('../key')

function Controllerusers(){}

var App= AV.Object.extend('App');
//var User= AV.Object.extend('user_information');

Controllerusers.prototype.users = function(req,res){

    res.render('users', {title:"index",reqs:req})

}
Controllerusers.prototype.app = function(req,response){

    // res.render('app', {title:"Relation"})
response.json("123")
}

Controllerusers.prototype.relation_app = function(req,res){
    var query = new AV.Query('_User');

    query.equalTo('username', req.body.user_name);

    query.find().then(function (results) {
        console.log(results)

        var user = AV.Object.createWithoutData('_User',results[0].id);

        var app = AV.Object.createWithoutData('App', '57bf9ff1c4c971006174e131');

        var relation = app.relation('containedUser');

        console.log(user)

        relation.add(user);

        app.save()

        res.redirect("/app")
    }, function (error) {

        res.redirect("/app")

    });

}
Controllerusers.prototype.query = function(req,res){

    res.render('app', {title:"Query"})

}

Controllerusers.prototype.query_app = function(req,res){

    var targetTag = AV.Object.createWithoutData('_User', '57bd65f38ac2470063196c01');

    var query = new AV.Query('App');

    query.equalTo('containedUser', targetTag);

    query.find().then(function (results) {

        console.log(results)
    }, function (error) {
    });

    res.redirect("/app")
}

Controllerusers.prototype.create_app = function(req,res){

    var userid = AV.User.current();

    var user = AV.Object.createWithoutData('_User', userid.id);

    var relation = user.relation('containedApps');

    var query = relation.query();

    query.find().then(function (results) {

        if(results.length < 6 ) {

            var app = new App();

            var roleQuery = new AV.Query(AV.Role);

            roleQuery.equalTo('name', 'Administrator');

            roleQuery.first().then(function (adminRole) {

                var userRelation = adminRole.relation('users');

                userRelation.query().find().then(function (userList) {

                    app.set('app_name',req.body.app_name);

                    var acl = new AV.ACL();

                    acl.setPublicReadAccess(true);

                    acl.setWriteAccess(AV.User.current(),true);

                    acl.setWriteAccess(userList[0],true);

                    app.setACL(acl);

                    var user = AV.User.current()

                    var apps = [app]
                    AV.Object.saveAll(apps).then(function (cloudApps) {

                        var relation = user.relation('containedApps');

                        relation.add(cloudApps[0]);

                        user.save();// 保存到云端

                    }, function (error) {

                    });

                }, function (error) {
                });
            }, function (error) {
            });
        }
        else {res.redirect("/app")}
    }, function (error) {
    });

}
Controllerusers.prototype.isLoggedIn = function(req, res, next) {

    if (req.isAuthenticated())

        return next();

    res.redirect('/');

}

module.exports = new Controllerusers();