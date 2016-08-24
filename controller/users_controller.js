var AV = require('../AV');
var http_key = require('../util/key_request')

function Controllerusers(){}

var App= AV.Object.extend('App');

Controllerusers.prototype.users = function(req,res){

    res.render('users', {title:"index",reqs:req})

}

/*Controller_users.prototype.create_app = function(req,res){



        var app = new Aqq();

        app.set('name',req.body.app_name);

        app.set('userid',req.body.user_id)

        app.save().then(function (todo) {

        }, function (error) {

            console.log(error);
        });
        console.log(data)


    res.redirect("/users")
}*/
Controllerusers.prototype.create_app = function(req,res){

    var app = new App();

    var administratorRole = new AV.Role("Administrator");//新建角色

    var relation= administratorRole.getUsers();

    administratorRole.getUsers().add(AV.User.current());//为当前用户赋予该角色

    administratorRole.save().then(function(administratorRole) {//角色保存成功

        var acl = new AV.ACL();

        acl.setPublicReadAccess(true);

        acl.setRoleWriteAccess(administratorRole,true);

        // 将 ACL 实例赋予 Post 对象
        app.setACL(acl);

        app.save(null, {
            success: function(app) {
            },
            error: function(app, error) {
                console.log(error);
            }
        });
    }, function(error) {
        //角色保存失败，处理 error
    });

    app.save().then(function (todo) {

    }, function (error) {

        console.log(error);
    });

    res.redirect("/users")
}
Controllerusers.prototype.isLoggedIn = function(req, res, next) {

    if (req.isAuthenticated())

        return next();

    res.redirect('/');

}

module.exports = new Controllerusers();