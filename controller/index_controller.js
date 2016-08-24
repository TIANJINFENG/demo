var http_key = require('../util/http_key_request');
console.log(http_key)
var http_api = require('../util/http_create_api_request')
console.log(http_api)
var http_visit_api = require('../util/visit_api')

function Controller_index(view){}

Controller_index.prototype.index= function(req,res){

     res.render ('index')

}
Controller_index.prototype.logout= function(req,res){

    req.logout();

    res.redirect('/');
}

Controller_index.prototype.dataBox= function(req,response){

    http_key( function(data){

    response.json (data)

    })
}

Controller_index.prototype.create_api= function(req,response){

    http_api( function(data){

        response.json (data)

    })
}
Controller_index.prototype.visit_api= function(req,response){

    http_visit_api( function(data){

        response.json (data)

    })
}
module.exports = new Controller_index();