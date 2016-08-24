var http_key = require('../util/key_request');

var http_api = require('../util/create_api_request')

var http_visit_api = require('../util/visit_api')

function Controllerindex(){}

Controllerindex.prototype.index= function(req,res){

     res.render ('index')

}
Controllerindex.prototype.logout= function(req,res){

    req.logout();

    res.redirect('/');
}

Controllerindex.prototype.dataBox= function(req,response){

    http_key( function(datas){

        response.json (datas)

    })
}

Controllerindex.prototype.create_api= function(req,response){

    http_api( function(datas){

        response.json (datas)

    })
}
Controllerindex.prototype.visit_api= function(req,response){

    http_visit_api( function(datas){

        response.json (datas)

    })
}
module.exports = new Controllerindex();